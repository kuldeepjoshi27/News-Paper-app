import { Outlet } from "react-router-dom";
import AppBar from "./Header/Header";
import LeftNewsBar from "./HomePageNews/LeftNewsBar";
import styles from "../CSS/Home.module.css";
import RightNewsBar from "./HomePageNews/RightNewsBar";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <>
      <AppBar />
      <div className={`container mt-3 pt-4 ${styles.container}`}>
        <div className={`row ${styles.row}`}>
          {/* Left Bar remains constant */}
          <div className={`col-md-3 ${styles.leftNewsBar}`}>
            <LeftNewsBar />   
          </div>
    
          {/* Middle Content will be dynamic */}
          <div className={`col-md-6 px-0 ${styles.middleNewsBar}`}>
            <div className={styles.scrollableContent}>
              <Outlet />
            </div>
          </div>

          {/* Right Bar remains constant */}
          <div className={`col-md-3 ${styles.otherNews}`}>
            <RightNewsBar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
