import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Image from "@components/Image";

import { Book } from "@utils/types";
import useFetch from "@utils/useFetch";
import useLocalStorage from "@utils/useLocalStorage";
import { formatDateToRender } from "@utils/date";

import "@styles/BookDetails.scss";
// import BookDetailShimmer from "./shimmers/BookDetailShimmer";
import BookDetailLoader from "./shimmers/BookDetailLoader";
// import BookDetailShimmer from "./shimmers/BookDetailShimmer";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Add useNavigate hook

  const { data, loading, error } = useFetch<Book>(`/books/${id}`);
  const [localBooks] = useLocalStorage<Book[]>("localBooks", []);
  const [isLoading, setIsLoading] = useState(true);

  const book = useMemo(() => {
    const localBook = localBooks.find((book: Book) => book.id == +id);
    if (localBook) return localBook;
    else if (!error && data?.id) {
      return data;
    } else {
      null;
    }
  }, [data, error, localBooks, id]);

  useEffect(() => {
    if (loading) return;
    else if (error && book?.id) setIsLoading(false);
    else if (!error && book) setIsLoading(false);
  }, [loading, book, error]);

  const handleBack = () => {
    navigate(-1);
  };

  console.log("HERE", isLoading);
  if (isLoading) return <BookDetailLoader />;

  return (
    <div className="book-detail">
      <button className="book-detail__back-button" onClick={handleBack}>
        &larr; Back
      </button>
      {!book ? (
        <div className="book-detail__no-book">No book found</div>
      ) : (
        <div className="book-detail__content">
          <Image
            src={book.cover}
            alt={book.title}
            className="book-detail__cover"
          />
          <div className="book-detail__info">
            <h2 className="book-detail__title">{book.title}</h2>
            <h3 className="book-detail__author">By: {book.author}</h3>
            <p className="book-detail__description">{book.description}</p>
            <p className="book-detail__publication">
              Published on: {formatDateToRender(book.publicationDate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
