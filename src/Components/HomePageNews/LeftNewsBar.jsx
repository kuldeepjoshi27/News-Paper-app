import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../CSS/LeftNewsBar.module.css";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const LeftNewsBar = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();

  // Map slugs to their corresponding Hindi names
  const categories = [
    {
      id: 0,
      icon: "fas fa-newspaper",
      name: "टॉप न्यूज",
      category: "top_news",
    },
    { id: 1, icon: "fas fa-city", name: "जयपुर शहर", category: "Jaipur-City" },
    {
      id: 2,
      icon: "fas fa-tree",
      name: "जयपुर ग्रामीण",
      category: "Jaipur-Rural",
    },
    { id: 3, icon: "fas fa-map", name: "राजस्थान हलचल", category: "Rajasthan" },
    { id: 4, icon: "fas fa-flag", name: "देश की हलचल", category: "national" },
    { id: 5, icon: "fas fa-futbol", name: "खेल हलचल", category: "sports" },
    {
      id: 6,
      icon: "fas fa-chart-line",
      name: "व्यापार हलचल",
      category: "business",
    },
    {
      id: 7,
      icon: "fas fa-film",
      name: "मनोरंजन हलचल",
      category: "entertainment",
    },
    {
      id: 8,
      icon: "fas fa-heartbeat",
      name: "स्वास्थ्य हलचल",
      category: "health",
    },
    {
      id: 9,
      icon: "fas fa-flask",
      name: "विज्ञान और तकनीक",
      category: "science",
    },
    {
      id: 10,
      icon: "fas fa-graduation-cap",
      name: "शिक्षा हलचल",
      category: "education",
    },
  ];

  const handleCategoryClick = (id, categorySlug) => {
    setSelectedItem(categorySlug);
    if (categorySlug === "top_news") {
      navigate("/");
    } else {
      navigate(`/${categorySlug}`);
    }
  };

  return (
    <div className={styles.LeftContainer}>
      <ul className={styles.newsList}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`${styles.newsItem} ${
              selectedItem === category.id ? styles.selected : ""
            }`}
            onClick={() => handleCategoryClick(category.id, category.category)}
          >
            <i className={category.icon}></i> {category.name}
          </li>
        ))}
      </ul>
      <div className={styles.App}>
        <p>Download App from </p>
        <img
          src="Google-Play.png"
          alt="Image not found"
          className={styles.GooglePlay}
        />
        <img
          src="App-Store.png"
          alt="Image not found"
          className={styles.AppStore}
        />
      </div>
      <div className={styles.socialfollow}>
        <p>Follow us on</p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNewsBar;
