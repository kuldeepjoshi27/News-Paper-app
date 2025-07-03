import styles from "../../CSS/MiddleNewsBar.module.css";
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";

const MiddleNewsBar = () => {
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  const topNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  const [firstNews, ...remainingNews] = topNews.filter(
    (news) => news.top_news === 0
  );
  const getCurrentDateInHindi = () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      locale: "hi-IN",
    };
    const currentDate = new Date();
    return new Intl.DateTimeFormat("hi-IN", options).format(currentDate);
  };

  return (
    <div className={styles.middleNewsBar}>
      <div className={styles.firstNews}>
        <Link to={`/news/${firstNews.slug}`} className={styles.newsLink}>
          <h3 className={styles.newsHead}>
            <span className={styles.newsHeading}>{firstNews.heading}: </span>
            {firstNews.subheading}
          </h3>
        </Link>

        <img
          src={firstNews.image}
          alt={firstNews.image}
          className={styles.newsImage} /* Add styling if needed */
        />
        <div className={styles.firstCategoryandDate}>
          <Link to={firstNews.category_slug} className={styles.newsLink}>
            <h5 className={styles.categoryFirst}>{firstNews.category_name}</h5>
          </Link>
          <h5 className={styles.firstDate}>{getCurrentDateInHindi()}</h5>{" "}
        </div>
      </div>

      {remainingNews.map((news) => (
        <div key={news.slug} className={styles.mappedNews}>
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <Link to={`/news/${news.slug}`} className={styles.newsLink}>
                  <h3 className={styles.mappedNewsHead}>
                    <span> {news.heading}:</span>
                    {` ${news.subheading}`}
                  </h3>
                </Link>
                <div className={styles.categoryandDate}>
                  <h5 className={styles.categoryDate}>
                    <Link to={news.category_slug} className={styles.newsLink}>
                      {" "}
                      <span> {news.category_name} </span>{" "}
                    </Link>
                    - {getCurrentDateInHindi()}{" "}
                  </h5>
                </div>
              </div>
              <div className="col-md-3">
                <img
                  src={news.image}
                  alt="स्वच्छ भारत अभियान"
                  className={styles.newsImage}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiddleNewsBar;
