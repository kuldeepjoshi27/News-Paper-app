import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HiHome, HiSearch } from "react-icons/hi";
import styles from "../../CSS/Header.module.css";
import DropdownMenu from "./DropdownMenu";

function Header() {
  return (
    <div className={`w-100 border-bottom ${styles.header}`}>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-between pt-2 pb-2  ">
          <NavLink to="/" className="d-flex ">
            <img src="logo.png" alt="Logo" width="170" height="60" />
          </NavLink>

          <div className="d-flex align-items-center ">
            <NavLink to="/" className="nav-link px-2 link-dark me-4 fw-bolder">
              <HiHome size={24} className="me-2" />
              घर
            </NavLink>

            <NavLink to="#" className="nav-link px-2 link-dark me-4 fw-bolder">
              <HiSearch size={24} className="me-2" />
              सर्च
            </NavLink>

            <DropdownMenu></DropdownMenu>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
