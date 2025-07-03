import styles from "../../CSS/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.copyright}>
          &copy; 2024 Newspaper Name. All Rights Reserved.
        </div>
        <div className={styles.navigation}>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.disclaimer}>
          Disclaimer: This newspaper is a fictional representation and not
          affiliated with any real newspaper.
        </div>
      </div>
    </div>
  );
};

export default Footer;
