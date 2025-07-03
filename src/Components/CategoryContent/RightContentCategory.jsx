/* eslint-disable react/prop-types */
import styles from "../../CSS/RightContentCategory.module.css"; // Import CSS module
import { formatDate } from "../../utils/dateUtils"; // Import the formatDate function
import { Link } from "react-router-dom"; // Import Link for navigation

const RightContentCategory = ({ rightNews }) => {
  return (
    <div className="container">
      <div className="row">
        {rightNews.map((newsItem, index) => (
          <div key={newsItem.slug} className={styles.newsSegment}>
            <div className="row">
              {/* Heading Column */}
              <div className="col-md-8 p-0">
                <Link
                  to={`/news/${newsItem.slug}`}
                  className={styles.newsheadingLink}
                >
                  <h2 className={styles.newsheading}>
                    {newsItem.heading.length > 35
                      ? `${newsItem.heading.substring(0, 40)}...`
                      : newsItem.heading}
                  </h2>
                </Link>
                <p className={styles.date}>{formatDate(newsItem.date)}</p>
              </div>
              {/* Image Column */}
              <div className="col-md-4">
                <Link
                  to={`/news/${newsItem.slug}`}
                  className={styles.newsSubheadingLink}
                >
                  <img
                    className={styles.newsImage}
                    src={newsItem.image}
                    alt={newsItem.heading}
                  />
                </Link>
              </div>
            </div>
            {/* Separator for each news item */}
            {index < rightNews.length - 1 && (
              <hr className={styles.separator} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightContentCategory;
