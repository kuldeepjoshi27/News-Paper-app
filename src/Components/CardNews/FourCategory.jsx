/* eslint-disable react/prop-types */
import CategoryCard from "./CategoryCard";

const FourCategory = ({ data }) => {
  // Filter and slice the data for each category
  const sportsData = data.filter(news => news.category === "Sports").slice(0, 4);
  const entertainmentData = data.filter(news => news.category === "Entertainment").slice(0, 4);
  const politicsData = data.filter(news => news.category === "Politics").slice(0, 4);
  const worldData = data.filter(news => news.category === "World").slice(0, 4);

  return (
    <div className="container">
      <div
        className="row"
        style={{
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <div className="col-md-3">
          <CategoryCard data={sportsData} />
        </div>
        <div className="col-md-3">
          <CategoryCard data={entertainmentData} />
        </div>
        <div className="col-md-3">
          <CategoryCard data={politicsData} />
        </div>
        <div className="col-md-3">
          <CategoryCard data={worldData} />
        </div>
      </div>
    </div>
  );
};

export default FourCategory;
