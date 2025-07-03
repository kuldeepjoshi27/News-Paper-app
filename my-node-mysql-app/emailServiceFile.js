/* eslint-disable no-undef */
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Function to send emails
async function sendEmail(recipients, subject, htmlContent) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    bcc: recipients.join(","), // Join recipients into a comma-separated string
    subject: subject, // Subject of the email
    html: htmlContent, // HTML content of the email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    // Log more details about the error
    if (error.response) {
      console.error("SMTP Error response:", error.response);
    }
    if (error.code) {
      console.error("SMTP Error code:", error.code);
    }
  }
}

module.exports = { sendEmail };
