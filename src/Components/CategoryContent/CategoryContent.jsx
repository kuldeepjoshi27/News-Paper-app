/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import LeftContentCategory from "./LeftContentCategory";
import RightContentCategory from "./RightContentCategory";

const CategoryContent = ({ NewsContent }) => {
  // Get the main news and two smaller ones
  const mainNews = NewsContent[0]; // Main news

  const smallerNews = NewsContent.slice(6, 9); // Next two news items
  const rightNews = NewsContent.slice(1, 6); // Next two news items
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <LeftContentCategory mainNews={mainNews} smallerNews={smallerNews} />
        </div>

        <div
          className="col-md-3 "
          style={{
            borderLeft: "1px solid #d3d3d3", // Adjust the thickness and color as needed
            // Optional: Adds space between the border and content
          }}
        >
          <RightContentCategory rightNews={rightNews} />
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
