import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils"; // Adjust the path as needed

const Dashboard = () => {
  const { data, loading, deleteNews } = useContext(DataContext); // Assuming deleteNewsItem function is provided by context
  const navigate = useNavigate(); // To handle edit navigation

  if (loading) return <p>Loading...</p>;

  // Function to truncate the description
  const truncateDescription = (desc, maxLength) => {
    if (desc.length > maxLength) {
      return desc.slice(0, maxLength) + "...";
    }
    return desc;
  };

  // Function to handle delete with confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      deleteNews(id); // Call the context function to delete
    }
  };

  // Function to handle edit
  const handleEdit = (id) => {
    navigate(`/admin/edit-news/${id}`); // Redirect to the edit form with the news ID
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>News</h1>
        <Link
          to="/admin/add-news"
          className="btn btn-primary"
          style={{ padding: "6px 11px" }}
        >
          Add News
        </Link>
      </div>

      <table border="2" cellPadding="15" cellSpacing="0" className="mt-3">
        <thead>
          <tr>
            <th>SL</th>
            <th>Heading</th>
            <th style={{ width: "250px" }}>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.heading}</td>
              <td>{truncateDescription(item.description, 100)}</td>
              <td>{item.category_name}</td>
              <td>{formatDate(item.date)}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(item.news_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.news_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3">
        <p>Total News: {data.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;
