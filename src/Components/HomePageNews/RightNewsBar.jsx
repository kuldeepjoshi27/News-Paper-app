/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../CSS/RightNewsBar.module.css";

const carouselItems = [
  {
    key: 1,
    url: "https://indeses.com/",
    image: "1.png",
    heading: "Indeses Buisness and Ventures Pvt. Ltd.",
  },
  {
    key: 2,
    url: "http://clouddigix.com/",
    image: "3.png",
    heading: "News Heading 3",
  },
  {
    key: 3,
    url: "http://clouddigix.com/",
    image: "4.png",
    heading: "",
  },
];

const RightNewsBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = carouselItems.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [totalItems]);

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>AD'S SENSE</h4>

      <div className={styles.carouselContainer}>
        {carouselItems.map((item, index) => (
          <div
            key={item.key}
            className={`${styles.carouselItem} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <a href={item.slug} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image}
                alt={item.heading}
                className={styles.carouselImage}
              />
            </a>

            <div className={styles.carouselCaption}>
              <Link to={`/news/${item.slug}`} className={styles.cardTitle}>
                <h5>{item.heading}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightNewsBar;
