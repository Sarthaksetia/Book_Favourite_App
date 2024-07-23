import "./bookDetailShimmer.scss";

const BookDetailLoader = () => {
  return (
    <div className="book-detail-shimmer">
      <div className="book-detail-shimmer__back-button shimmer-animation"></div>
      {/* <div className="book-detail-shimmer__content"> */}
      <div className="book-detail-shimmer__cover shimmer-animation"></div>
      <div className="book-detail-shimmer__info">
        <div className="book-detail-shimmer__title shimmer-animation"></div>
        <div className="book-detail-shimmer__author shimmer-animation"></div>
        <div className="book-detail-shimmer__description shimmer-animation"></div>
        <div className="book-detail-shimmer__publication shimmer-animation"></div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default BookDetailLoader;
