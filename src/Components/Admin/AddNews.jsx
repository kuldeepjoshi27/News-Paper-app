import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const News = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const authorRef = useRef(null);
  const dateRef = useRef(null);
  const topNewsRef = useRef(null);
  const readTimeRef = useRef(null);
  const slugRef = useRef(null);
  const categoryRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data); // Set categories to state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Capture the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value; // Check which button was clicked

    const currentStatus = action === "publish" ? "published" : "draft";

    // FormData to handle file upload
    const formData = new FormData();
    formData.append("heading", headingRef.current.value);
    formData.append("subheading", subheadingRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("author", authorRef.current.value);
    formData.append("date", dateRef.current.value);
    formData.append("top_news", topNewsRef.current.checked ? 1 : 0);
    formData.append("read_time", parseInt(readTimeRef.current.value, 10));
    formData.append("slug", slugRef.current.value);
    formData.append("status", currentStatus);
    formData.append("category_id", categoryRef.current.value);

    if (imageFile) {
      formData.append("image", imageFile); // Attach image file to the form data
    }

    try {
      const response = await fetch("http://localhost:3000/news", {
        method: "POST",
        body: formData, // Send formData containing the image file and other fields
      });
      const result = await response.json();
      if (result.success) {
        alert("News added successfully!");
        // Optionally reset form fields

        setImageFile(null); // Clear the image file state
        navigate(action === "publish" ? "/admin/news" : "/admin/draft"); // Navigate to the Dashboard or any other page
      } else {
        alert("Failed to add news.");
      }
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <h2>Add News</h2>
        <div style={{ marginLeft: "auto" }}>
          <button
            className="btn btn-secondary mb-0 mx-1"
            onClick={() => window.open("https://chat.openai.com/", "_blank")}
          >
            ChatGPT for Slug
          </button>

          <button
            className="btn btn-secondary mb-0 mx-1"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Go Back
          </button>
        </div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Heading</label>
          <input
            type="text"
            className="form-control"
            ref={headingRef}
            required
          />
        </div>

        <div className="form-group">
          <label>Subheading</label>
          <input
            type="text"
            className="form-control"
            ref={subheadingRef}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            ref={categoryRef}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" ref={descriptionRef} required />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            ref={authorRef}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="datetime-local"
            className="form-control"
            ref={dateRef}
            required
          />
        </div>

        <div className="form-group form-check py-2">
          <input
            type="checkbox"
            className="form-check-input"
            ref={topNewsRef} // Assuming you have a ref for this checkbox
          />
          <label className="form-check-label">Top News</label>
        </div>

        <div className="form-group">
          <label>Read Time (in minutes)</label>
          <input
            type="number"
            className="form-control"
            ref={readTimeRef}
            required
          />
        </div>

        <div className="form-group">
          <label>Slug</label>
          <input type="text" className="form-control" ref={slugRef} required />
        </div>

        <div>
          <button
            type="submit"
            value="publish"
            className="btn btn-primary mt-3 mx-2"
          >
            Publish
          </button>

          <button
            type="submit"
            value="draft"
            className="btn btn-secondary mt-3"
          >
            Save As Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default News;
