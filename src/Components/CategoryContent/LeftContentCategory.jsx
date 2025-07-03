/* eslint-disable react/prop-types */
import styles from "../../CSS/LeftContentCategory.module.css"; // Import CSS module
import { formatDate } from "../../utils/dateUtils"; // Import the formatDate function
import { Link } from "react-router-dom"; // Import Link for navigation

const LeftContentCategory = ({ smallerNews, mainNews }) => {
  // Filter and get the news items from the "World" category

  return (
    <div className="container ps-4">
      <h4 className={styles.title}>
        {mainNews.category != null && mainNews.category}
      </h4>

      {/* Main News Section */}
      {mainNews && (
        <div className="row mb-4">
          <div className="col-md-6">
            <Link
              to={`/news/${mainNews.slug}`}
              className={styles.newsheadingLink}
            >
              <h2 className={styles.heading}>{mainNews.heading}</h2>
            </Link>
            <div className={styles.categoryDateContainer}>
              <p className={styles.category}>
                <Link
                  to={`/category/${mainNews.category}`}
                  className={styles.newsCategoryLink}
                >
                  <span className={styles.categoryText}>
                    {mainNews.category}
                  </span>
                </Link>
              </p>
              <p className={styles.date}>- {formatDate(mainNews.date)}</p>
            </div>
            <p className={styles.description}>
              {mainNews.description?.slice(0, 150)} ...
            </p>
            <Link to={`/news/${mainNews.slug}`}>
              <button className={styles.readMore}>Read More</button>
            </Link>
          </div>
          <div className="col-md-6">
            <Link to={`/news/${mainNews.slug}`}>
              <img
                src={`${mainNews.image}`}
                alt="News"
                className={styles.image}
              />
            </Link>
          </div>
        </div>
      )}

      <hr style={{ borderColor: "black" }} />

      {/* Bottom Section - Smaller News Items */}
      <div className="container">
        <div className="row mt-2 ">
          {smallerNews.map((news, index) => (
            <div
              key={news.slug}
              className={`col-md-4  px-0 ${index < 2 ? styles.withBorder : ""}`}
            >
              <div className={styles.newsItem}>
                <div className={styles.newsHeader}>
                  <Link
                    to={`/news/${news.slug}`}
                    className={styles.newsheadingLink}
                  >
                    <h3 className={styles.headingBelow}>{news.heading}</h3>
                  </Link>
                  <p className={styles.newsDateBelow}>
                    {formatDate(news.date)}
                  </p>
                </div>
                <p className={styles.newsDescriptionBelow}>
                  {news.description?.slice(0, 100)} ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftContentCategory;
