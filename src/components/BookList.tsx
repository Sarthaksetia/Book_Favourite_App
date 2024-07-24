import React, { type ChangeEvent, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import BookCard from "@components/BookCard";
import Pagination from "@components/Pagination";
import BookCardLoader from "@components/shimmers/BookCardLoader";
import Button from "@components/Button";

import type { Book } from "@utils/types";
import "@styles/BookList.scss";

type BookListProps = {
  favorites: number[];
  openModal: () => void;
  onToggleFavorite: (id: number) => void;
  deleteModalOpen: (id: number) => void;
  allBooks: Book[];
  loading: boolean;
  error: string;
  searchQuery: string;
  handleSearchChange: (search: ChangeEvent<HTMLInputElement>) => void;
  editModalOpen: (book: Book) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};
const booksPerPage = 5;

const BookList: React.FC<BookListProps> = ({
  favorites,
  openModal,
  onToggleFavorite,
  deleteModalOpen,
  allBooks,
  loading,
  error,
  searchQuery,
  handleSearchChange,
  editModalOpen,
  currentPage,
  setCurrentPage,
}) => {
  const currentBooks = useMemo(() => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return allBooks.slice(indexOfFirstBook, indexOfLastBook);
  }, [allBooks, currentPage]);

  const paginate = useCallback(
    (pageNumber: number) => setCurrentPage(pageNumber),
    [setCurrentPage]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="header-wrapper">
        <input
          placeholder="Search"
          className="header-wrapper__search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Pagination
          totalBooks={allBooks.length}
          booksPerPage={booksPerPage}
          paginate={paginate}
          currentPage={currentPage} // Pass currentPage to Pagination
        />
        <div>
          <Button
            onClick={() => {
              openModal();
            }}
          >
            <div className="header-wrapper__add-book">
              <FontAwesomeIcon icon={faPlus} />
              {"Add"}
            </div>
          </Button>
        </div>
      </div>

      <div className="book-list">
        {currentBooks.length > 0 ? (
          currentBooks.map((book: Book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={onToggleFavorite}
              deleteModalOpen={deleteModalOpen}
              editModalOpen={editModalOpen}
            />
          ))
        ) : searchQuery ? (
          <div>No book found for "{searchQuery}"</div>
        ) : (
          <BookCardLoader />
        )}
      </div>
    </>
  );
};

export default BookList;
