/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

require("dotenv").config();

const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const nodemailer = require("nodemailer");
const { sendEmail } = require("./emailServiceFile");
const axios = require("axios"); // Add this line

const session = require("express-session");
const CLIENT_ID =
  "421410020066-cd74vod6bc63tb3v1gdjjvtfhobuvhrj.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const clientId = "Ov23lia2wRjk9kWpiGlE";
const clientSecret = "ec516a3214ee9a80afe84b056d4567a66247e61b";

// Import the database connection
const db = require("./db");

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public")); // Save to the public/images folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
  },
});

const upload = multer({ storage });

app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code; // Authorization code from GitHub

  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Use the access token to fetch user data from GitHub API
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = userResponse.data;

    // You can store user data in session or database here (optional)
    // Example: req.session.user = userData; or store in DB

    // Redirect to the homepage of your React app
    res.redirect("http://localhost:5173"); 
  } catch (error) {
    console.error("Error during GitHub OAuth:", error.message);

    // Redirect to an error page in your React app
    res.redirect("http://localhost:5173/error?message=AuthenticationFailed");
  }
});

async function findOrCreateUser(payload) {
  return new Promise((resolve, reject) => {
    // Check if user already exists based on Google ID (sub) or email
    db.query(
      "SELECT * FROM users WHERE email = ? OR google_id = ?",
      [payload.email, payload.sub], // Use email or google_id to search
      (err, result) => {
        if (err) reject(err); 

        if (result.length > 0) {
          // User exists, return user
          resolve(result[0]);
        } else {
          // User doesn't exist, create a new user
          const newUser = {
            google_id: payload.sub, // Google ID
            email: payload.email, // User's email
            name: payload.name, // User's name
          };
          db.query("INSERT INTO users SET ?", newUser, (err, result) => {
            if (err) reject(err);

            // Return the newly created user
            resolve(newUser);
          });
        }
      }
    );
  });
}

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get("/news", (req, res) => {
  const query = `
    SELECT 
      n.id AS news_id,
      n.heading,
      n.subheading,
      n.description,
      n.image,
      n.author,
      n.date,
      n.read_time,
      n.slug,
      n.status,
      n.top_news,
      n.created_at,
      n.updated_at,
      n.deleted_at,
      c.category_name,
      c.category_slug
    FROM 
      news n
    JOIN 
      categories c ON n.category_id = c.id
      where n.status = 'published' 
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res.status(500).send("Error executing query");
      return;
    }
    const responseData = {
      news: results,
    };
    res.json(responseData);
  });
});

// Assuming you already have the express app set up

app.get("/draft-news", (req, res) => {
  const query = `
    SELECT 
      n.id AS news_id,
      n.heading,
      n.subheading,
      n.description,
      n.image,
      n.author,
      n.date,
      n.read_time,
      n.slug,
      n.status,
      n.top_news,
      n.created_at,
      n.updated_at,
      n.deleted_at,
      c.category_name,
      c.category_slug
    FROM 
      news n
    JOIN 
      categories c ON n.category_id = c.id
    WHERE 
      n.status = 'draft'  -- Filter for draft news
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res.status(500).send("Error executing query");
      return;
    }
    const responseData = {
      news: results,
    };
    res.json(responseData);
  });
});

// Handle the form submission including file upload
app.post("/news", upload.single("image"), (req, res) => {
  const {
    heading,
    subheading,
    description,
    author,
    date,
    top_news,
    read_time,
    slug,
    status,
    category_id,
  } = req.body;

  // Validate required fields
  if (!heading || !category_id || !description || !author || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Required fields are missing." });
  }

  const imageUrl = req.file ? `/${req.file.filename}` : null;

  // SQL query to insert news into the database
  const query = `
    INSERT INTO news 
    (heading, subheading, description, image, author, date, top_news, read_time, slug, status, category_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    heading,
    subheading,
    description,
    imageUrl,
    author,
    date,
    top_news,
    read_time,
    slug,
    status,
    category_id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting news:", err.stack);
      return res
        .status(500)
        .json({ success: false, message: "Database error." });
    }

    // Fetch emails and send notifications
    db.query("SELECT email FROM users", async (fetchErr, users) => {
      if (fetchErr) {
        console.error("Error fetching users:", fetchErr.stack);
        return res
          .status(500)
          .json({ success: false, message: "Error fetching users." });
      }

      const emails = users.map((user) => user.email);

      // Send emails if there are users
      if (emails.length > 0) {
        const subject = `New Article Published: ${heading}`;
        const htmlContent = `
          <h1>${heading}</h1>
          <p>${description}</p>
          <p>Read more <a href="http://yourwebsite.com/articles/${slug}">here</a>.</p>
        `;

        try {
          await sendEmail(emails, subject, htmlContent);
        } catch (emailErr) {
          console.error("Error sending email notifications:", emailErr);
        }
      }

      // Respond with success after inserting and attempting email notifications
      res.json({ success: true, message: "News added successfully!" });
    });
  });
});

app.put("/news/:id", (req, res) => {
  const { id } = req.params;
  const {
    heading,
    subheading,
    category,
    description,
    author,
    date,
    top_news,
    read_time,
    slug,
    status,
  } = req.body;

  // Validate required fields
  if (!heading || !category || !description || !author || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Required fields are missing." });
  }

  console.log("Updating news item with ID:", id);
  console.log("Request body:", req.body);

  // Format the date if necessary
  const formattedDate = new Date(date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); // For DATETIME

  const query = `
    UPDATE news SET 
      heading = ?, 
      subheading = ?, 
      category = ?, 
      description = ?, 
      author = ?, 
      date = ?, 
      top_news = ?,  
      read_time = ? 
    WHERE id = ?
  `;

  const values = [
    heading,
    subheading,
    category,
    description,
    author,
    formattedDate,
    top_news,
    read_time,
    id,
  ];

  console.log("Generated query:", query);
  console.log("Values:", values);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update news." });
    }
    if (results.affectedRows === 0) {
      // No rows affected, means the ID might not be found
      return res
        .status(404)
        .json({ success: false, message: "News item not found." });
    }
    res.json({ success: true, message: "News updated successfully!" });
  });
});

// DELETE route to remove a news item by ID
app.delete("/news/:id", (req, res) => {
  const newsId = req.params.id;

  // SQL query to delete the news item
  const query = `DELETE FROM news WHERE id = ?`;

  db.query(query, [newsId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete news." });
      return;
    }

    if (results.affectedRows === 0) {
      // No rows affected, means the ID might not be found
      res.status(404).json({ success: false, message: "News item not found." });
      return;
    }

    res.json({ success: true, message: "News item deleted successfully!" });
  });
});

app.post("/signup", (req, res) => {
  const { email, password, name } = req.body;

  // Step 1: Check if the email already exists
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking for existing email:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // Step 2: If email exists, return an error response
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Step 3: Proceed to insert user into the database
    const insertQuery =
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
    db.query(insertQuery, [email, password, name], (err, result) => {
      if (err) {
        console.error("Error inserting user data:", err);
        return res.status(500).json({ message: "Server error" });
      }

      // Respond with success message
      res.status(201).json({ message: "Signup successful" });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if Email and Password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Query to check if the user exists
  const query = "SELECT * FROM users WHERE Email = ? AND Password = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Server error" });
    }
    console.log(result[0]);

    const sessionToken = jwt.sign(
      { email: result.email },
      process.env.JWT_SECRET_KEY, // Replace with your secret key
      { expiresIn: "1h" } // Set JWT expiration time as needed
    );

    // If no user is found
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If user is found
    res.status(200).json({
      message: "Login successful",
      token: sessionToken,
      user: result[0],
    });
  });
});

// Google login route
app.post("/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload(); // Get user information from Google token

    // Find or create user in database
    const user = await findOrCreateUser(payload);

    // Create a session token (JWT)
    const sessionToken = jwt.sign(
      { userId: user.google_id, email: user.email },
      process.env.JWT_SECRET_KEY, // Replace with your secret key
      { expiresIn: "1h" } // Set JWT expiration time as needed
    );

    // Send the session token as response
    res.status(200).json({
      message: "Login successful",
      token: sessionToken,
      user: user, // Send user data as part of the response
    });
  } catch (error) {
    console.error("Error during Google login:", error);
    res
      .status(500)
      .json({ message: "Google login failed", error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Gracefully handle shutdown
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err.stack);
    } else {
      console.log("MySQL connection closed.");
    }
    process.exit(0);
  });
});
