import styles from "../../CSS/MiddleNewsBar.module.css";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import LoadingSpinner from "../LoadingSpinner";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  const sortedNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  const categoryNews = sortedNews.filter(
    (news) => news.category_slug === categoryName
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
      {categoryNews.map((news) => (
        <div key={news.slug} className={styles.mappedNews}>
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                {/* Link to the news description page */}
                <Link to={`/news/${news.slug}`} className={styles.newsLink}>
                  <h3 className={styles.mappedNewsHead}>
                    <span> {news.heading}:</span> {` ${news.subheading}`}
                  </h3>
                </Link>
                <div className={styles.categoryandDate}>
                  <h5 className={styles.categoryDate}>
                    {/* Link to the category page */}
                    <Link
                      to={`/${news.category_slug}`}
                      className={styles.newsLink}
                    >
                      <span>{news.category_name}</span>
                    </Link>
                    - {getCurrentDateInHindi()}
                  </h5>
                </div>
              </div>
              <div className="col-md-3">
                {/* Link on the image as well */}
                <Link to={`/news/${news.slug}`}>
                  <img
                    src={news.image}
                    alt={news.heading}
                    className={styles.newsImage}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
