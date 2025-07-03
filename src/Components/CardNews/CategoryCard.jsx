/* eslint-disable react/prop-types */
import styles from "../../CSS/CategoryCard.module.css";
import { formatDate } from "../../utils/dateUtils"; // Import the formatDate function
import { Link } from "react-router-dom"; // Import Link for navigation

const CategoryCard = ({ data }) => {
  // Ensure there's data to avoid errors
  if (!data.length) return null;

  // Destructure properties from the first data item
  const { image, heading, category, date, description } = data[0];

  return (
    <div className={styles.card}>
       <h2 className={styles.tophead}>{category}</h2>
      <div className={styles.imageContainer}>
        <Link to={`/news/${data[0].slug}`}>
          <img src={image} className={styles.image} alt={heading} />
        </Link>
      </div>
      <h2 className={styles.heading}>
        <Link to={`/news/${data[0].slug}`} className={styles.newsheadingLink}>
          {heading.length > 40 ? heading.slice(0, 47) + "..." : heading}
        </Link>
      </h2>
      <p className={styles.meta}>
        <Link to={`/category/${category}`} className={styles.newsCategoryLink}>
          {category}
        </Link>{" "}
        - {formatDate(date)}
      </p>
      <p className={styles.description}>
        {description.length > 100 ? description.slice(0, 97) + "..." : description}
      </p>
      <hr className={styles.line} />

      {/* Map through the remaining data */}
      {data.slice(1).map((sData, index) => (
        <div key={sData.slug} className={styles.mapDataItem}>
          <h2 className={styles.newsHeading}>
            <Link to={`/news/${sData.slug}`} className={styles.newsheadingLink}>
              {sData.heading.length > 40 ? sData.heading.slice(0, 56) + "..." : sData.heading}
            </Link>
          </h2>
          <p className={styles.newsMeta}>{formatDate(sData.date)}</p>
          {index < data.length - 2 && <hr className={styles.mapLine} />}
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
