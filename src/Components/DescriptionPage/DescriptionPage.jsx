import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import styles from "../../CSS/DescriptionPage.module.css";
import { Link } from "react-router-dom";

const DescriptionPage = () => {
  const { slug } = useParams();
  const { data } = useContext(DataContext);
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const foundItem = data.find((item) => item.slug === slug);
    setNewsItem(foundItem);

    if (foundItem) {
      const filteredNews = data.filter(
        (item) =>
          item.category_name === foundItem.category_name && item.slug !== slug
      );
      setRelatedNews(filteredNews);
    }
  }, [slug, data]);

  if (!newsItem) return <p>Loading...</p>;

  return (
    <div className={`px-0 ${styles.DescriptionPage}`}>
      {/* Main News Item */}
      <div className={styles.mainNews}>
        <h3 className={styles.pageHeading}>
          <span className={styles.newsHeading}>{newsItem.heading}: </span>
          {newsItem.subheading}
        </h3>
        <img
          src={`${newsItem.image}`}
          alt="news thumbnail"
          className={styles.newsImage}
        />
        <p className={styles.newsDescription}>{newsItem.description}</p>
      </div>

      <hr className={styles.grayLine} />
      <h3 className={styles.pageTitleHeading}>
        {newsItem.category_name} की और ख़बरें पढ़ें
      </h3>
      {/* Related News Items */}

      {relatedNews.map((news) => (
        <div key={news.slug} className={styles.relatedNewsItem}>
          <div className="container">
            <div className="row">
              {/* Left Column for News Content */}
              <div className="col-md-9">
                <Link to={`/news/${news.slug}`} className={styles.newsLink}>
                  <h3 className={styles.relatedNewsSubHeading}>
                    <span className={styles.newsHeading}>{news.heading}: </span>
                    {news.subheading}
                  </h3>
                </Link>
                <div className={styles.categoryandDate}>
                  <h5 className={styles.newsMeta}>
                    {news.category_name} - {news.date}
                  </h5>
                </div>
              </div>

              {/* Right Column for Image */}
              <div className="col-md-3">
                <img
                  src={`${news.image}`}
                  alt={news.heading}
                  className={styles.relatedNewsImage}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DescriptionPage;
