/* eslint-disable react/prop-types */
import LeftNewsBar from "./LeftNewsBar";
import MiddleNewsBar from "./MiddleNewsBar";
import RightNewsBar from "./RightNewsBar";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsContent = ({ data }) => {
  const sortedNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the latest news item
  const latestNews = sortedNews[0];

  // Get 5 news items from the same category as the latest news
  const categoryNews = sortedNews
    .filter((news) => news.category === latestNews.category)
    .slice(0, 5); // Fetch only 5 news items, including the latest one

  const secondCategoryNews = sortedNews
    .filter((news) => news.category === "Entertainment")
    .slice(0, 3);

  const thirdCategoryNews = sortedNews
    .filter((news) => news.category === "World")
    .slice(0, 4);

  const justInNews = sortedNews
    .filter((news) => news.category === "World")
    .slice(0, 5);
  const justInBelow = sortedNews
    .filter((news) => news.category === "Sports")
    .slice(0, 3);

  return (
    <div
      className="container"
      style={{
        marginTop: "50px",
      }}
    >
      <div className="row">
        <div className="col-md-6" >
          <LeftNewsBar latestNews={latestNews} categoryNews={categoryNews} />
        </div>

        {/* Middle with border on both sides */}
        <div
          className="col-md-3"
          style={{
            borderLeft: "1px solid lightgray",
          }}
        >
          <MiddleNewsBar
            thirdCategoryNews={thirdCategoryNews}
            secondCategoryNews={secondCategoryNews}
          />
        </div>

        <div
          className="col-md-3"
          style={{
            borderLeft: "1px solid lightgray",
          }}
        >
          <RightNewsBar justInBelow={justInBelow} justInNews={justInNews} />
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
