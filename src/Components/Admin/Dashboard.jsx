import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom"; // Import Link for routing

const Dashboard = () => {
  const { data, loading } = useContext(DataContext); // Fetch news data from the context

  if (loading) return <p>Loading...</p>;

  // Dummy data for demonstration
  const totalCategories = 10; // Replace with actual data
  const totalImages = 50; // Replace with actual data
  const totalUsers = 100; // Replace with actual data
  const totalSubscribers = 200; // Replace with actual data
  const totalVideos = 30; // Replace with actual data

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total News</h5>
              <p className="card-text">{data.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Categories</h5>
              <p className="card-text">{totalCategories}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Images</h5>
              <p className="card-text">{totalImages}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Subscribers</h5>
              <p className="card-text">{totalSubscribers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Videos</h5>
              <p className="card-text">{totalVideos}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Link to="/admin/add-news" className="btn btn-primary">
          Add News
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
