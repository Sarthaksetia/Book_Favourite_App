import React, { MouseEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import FavoriteButton from "@components/FavoriteButton";
import Image from "@components/Image";

import { Book } from "@utils/types";
import { formatDateToRender } from "@utils/date";

import "@styles/BookCard.scss";

type BookCardProps = {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  deleteModalOpen?: (id: number) => void;
  onEditBook?: (id: number) => void;
  editModalOpen: (book: Book) => void;
};

const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite,
  onToggleFavorite,
  deleteModalOpen,
  editModalOpen,
}) => {
  const navigate = useNavigate();

  const toggleFavorite = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onToggleFavorite(book.id);
    },
    [book.id, onToggleFavorite]
  );

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleDelete = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if (deleteModalOpen) {
      deleteModalOpen(book.id);
    }
  };

  const handleEdit = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if (editModalOpen) {
      editModalOpen(book);
    }
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="book-card__cover">
        <Image src={book.cover} alt={book.title} className="" />
      </div>

      <div className="book-card__details">
        <div className="book-card__content">
          <h3 className="book-card__content__title">{book.title}</h3>
          <p className="book-card__content__author">Author By: {book.author}</p>
          <p className="book-card__content__description">{book.description}</p>
          <p className="book-detail__publication">
            Published on: {formatDateToRender(book.publicationDate)}
          </p>
        </div>
        <div className="book-card__actions">
          <div className="book-card__actions__edit-delete">
            <FontAwesomeIcon
              icon={faEdit}
              onClick={handleEdit}
              className="book-card__actions__icon"
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={handleDelete}
              className="book-card__actions__icon"
            />
          </div>
          <div className="book-card__actions__fav-icon">
            <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
