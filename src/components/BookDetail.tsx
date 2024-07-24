import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Image from "@components/Image";

import useFetch from "@utils/useFetch";
import useLocalStorage from "@utils/useLocalStorage";
import { formatDateToRender } from "@utils/date";
import type { Book } from "@utils/types";

import "@styles/BookDetails.scss";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error } = useFetch<Book>(`/books/${id}`);
  const [localBooks] = useLocalStorage<Book[]>("localBooks", []);

  const book = useMemo(() => {
    const localBook = localBooks.find((book: Book) => book.id == +id);
    if (localBook) return localBook;
    else if (!error && data?.id) {
      return data;
    } else {
      null;
    }
  }, [data, error, localBooks, id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!book && !error) return <div>Loading...</div>;
  return (
    <div className="book-detail">
      <button className="book-detail__back-button" onClick={handleBack}>
        &larr; Back
      </button>
      {!book && error ? (
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
