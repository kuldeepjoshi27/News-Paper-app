/* eslint-disable react/prop-types */
import styles from "../../CSS/HeaderNews.module.css";
import { Link } from "react-router-dom"; // Import Link for navigation

const HeaderNews = ({ data }) => {
  const newsItems = data.filter((news) => news.set_in_header === 1);

  return (
    <div className={styles.outerdiv}>
      <div className="container p-3">
        <div className="row">
          {newsItems.map((news, index) => (
            <div
              className="col-md-3"
              key={news.slug}
              style={{
                borderRight:
                  index < newsItems.length - 1 ? "1px solslug #3033" : "",
              }}
            >
              <div className="row">
                <div className="col-md-8">
                  <div className={styles.newsContent}>
                    {/* Link to the category page */}
                    <Link
                      to={`category/${news.category}`}
                      className={styles.newsCategoryLink}
                    >
                      <span className={styles.newsCategory}>
                        {news.category}
                      </span>
                    </Link>

                    <Link
                      to={`/news/${news.slug}`}
                      className={styles.newsSubheadingLink}
                    >
                      <h4 className={styles.newsheading}>{news.heading}</h4>
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src={`/${news.image}`}
                    alt={news.subheading}
                    className={styles.newsImageHeader}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr style={{ borderColor: "#ddd" }} />
    </div>
  );
};

export default HeaderNews;
