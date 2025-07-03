import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // Sidebar component
import styles from "../../CSS/AdminLayout.module.css"; // Import the CSS module

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar (AdminDashboard) */}
      <div className={styles.sidebar}>
        <AdminDashboard />
      </div>

      {/* Main content area for child routes like AddNews, Users, etc. */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
