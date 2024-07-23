const BookDetailShimmer = () => {
  return (
    <div className="book-detail">
      <button className="book-detail__back-button">&larr; Back</button>
      <div className="book-detail__content">
        <div className="shimmer-animation" />
        <div className="book-detail__info">
          <h2 className="book-detail__title shimmer-animation" />
          <h3 className="book-detail__author shimmer-animation" />
          <p className="book-detail__description shimmer-animation" />
          <p className="book-detail__publication shimmer-animation" />
        </div>
      </div>
    </div>
  );
};

export default BookDetailShimmer;
