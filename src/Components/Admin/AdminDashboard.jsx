import { Link } from "react-router-dom";
import styles from "../../CSS/AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>Jaipur Halchal</div>
      <ul>
        <li>
          <Link to="" className={styles.navLink}>
            <svg className={styles.svgIcon} width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="category" className={styles.navLink}>
            <svg className={styles.svgIcon} width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            Category
          </Link>
        </li>
        <li>
          <Link to="news" className={styles.navLink}>
            <svg className={styles.svgIcon} width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            News
          </Link>
        </li>
        <li>
          <Link to="draft" className={styles.navLink}>
            <svg className={styles.svgIcon} width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Drafts
          </Link>
        </li>
        <li>
          <Link to="settings" className={styles.navLink}>
            <svg className={styles.svgIcon} width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
