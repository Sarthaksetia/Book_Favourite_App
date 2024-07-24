import "@styles/BookCardLoader.scss";

const BookCardLoader = () => (
  <>
    {Array.from(Array(5).keys()).map((_) => (
      <div className="book-card-loader" key={_}>
        <div className="book-card-loader__cover shimmer-animation" />

        <div className="book-card-loader__details ">
          <div className="book-card-loader__content">
            <h3 className="book-card-loader__content__title shimmer-animation" />
            <p className="book-card-loader__content__author shimmer-animation" />
            <p className="book-card-loader__content__description shimmer-animation" />
          </div>
        </div>
      </div>
    ))}
  </>
);

export default BookCardLoader;
