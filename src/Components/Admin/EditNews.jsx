import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const EditNews = () => {
  const { id } = useParams(); // Get news ID from URL parameters
  const { data, loading, updateNews } = useContext(DataContext);
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    category: "",
    description: "",
    author: "",
    date: "", // Format: yyyy-MM-dd
    top_news: false, // Initialize as false
    read_time: "",
  });
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true); // State to track if form data is initially loaded

  useEffect(() => {
    if (!loading && id && isInitialLoad) {
      const fetchNewsItem = () => {
        const item = data.find((news) => news.news_id === parseInt(id));
        if (item) {
          setFormData({
            heading: item.heading,
            subheading: item.subheading,
            category: item.category_name,
            description: item.description,
            author: item.author,
            // Convert ISO date string to yyyy-MM-dd format
            date: format(parseISO(item.date), "yyyy-MM-dd"),
            top_news: item.top_news === 1, // Convert from 1/0 to boolean
            read_time: item.read_time,
          });
        }
        setIsInitialLoad(false); // Set initial load to false after loading form data
      };

      fetchNewsItem();
    }
  }, [id, data, loading, isInitialLoad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        top_news: formData.top_news ? 1 : 0, // Convert boolean to 1/0 for submission
      };
      await updateNews(id, updatedData);
      navigate("/admin/news"); // Navigate after successful update
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit News</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="heading" className="form-label">
            Heading
          </label>
          <input
            type="text"
            className="form-control"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subheading" className="form-label">
            Subheading
          </label>
          <input
            type="text"
            className="form-control"
            id="subheading"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="top_news"
            name="top_news"
            checked={formData.top_news} // Ensure this reflects the current state
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="top_news">
            Top News
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="read_time" className="form-label">
            Read Time
          </label>
          <input
            type="text"
            className="form-control"
            id="read_time"
            name="read_time"
            value={formData.read_time}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNews;
