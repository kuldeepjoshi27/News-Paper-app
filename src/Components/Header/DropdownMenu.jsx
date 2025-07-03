import { IoMdPerson } from "react-icons/io";
import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import styles from "../../CSS/DropdownMenu.module.css"; // Import CSS file

function ProfileDropdown() {
  const { isLoggedIn, logout } = useContext(DataContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="dropdown dropend">
      <button
        className={`${styles.profileButton}`}
        type="button"
        id="profileDropdown"
        aria-expanded="false"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <div className={styles.profileIcon}>
          <IoMdPerson size={24} />
        </div>
        <span className={styles.caret}>▼</span> {/* Arrow symbol */}
      </button>

      <ul
        className={`dropdown-menu ${showProfileMenu ? "show" : ""} ${
          styles.dropdownMenu
        }`}
        aria-labelledby="profileDropdown"
      >
        <li className="d-flex align-items-center">
          <Link
            to={isLoggedIn ? "/" : "/login"}
            className="dropdown-item fw-bold me-2"
          >
            {isLoggedIn ? "प्रोफ़ाइल" : "लॉगिन"}
          </Link>
        </li>
        <li>
          <a className="dropdown-item fw-bold" href="#">
            सेटिंग्स
          </a>
        </li>

        <li>
          <a className="dropdown-item fw-bold" href="#">
            मदद
          </a>
        </li>
        <li>
          {isLoggedIn && (
            <button className="dropdown-item fw-bold" onClick={logout}>
              लॉगआउट
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
