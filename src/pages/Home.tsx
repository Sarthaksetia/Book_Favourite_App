import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@components/ModalComponent";
import BookForm from "@components/BookForm";
import DeleteModal from "@components/DeleteModal";
import BookList from "@components/BookList";

import { BookContext } from "@contexts/BookContext";

import { formatDate } from "@utils/date";
import useLocalStorage from "@utils/useLocalStorage";
import type { Book } from "@utils/types";

import "@styles/Home.scss";

const Home: React.FC = () => {
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const [localBooks, setLocalBooks] = useLocalStorage<Book[]>("localBooks", []);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const { books, loading, error } = useContext(BookContext);

  useEffect(() => {
    if (books) {
      setAllBooks([...books, ...localBooks]);
    }
  }, [books, localBooks]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const page = parseInt(params.get("page") || "1", 10);

    setSearchQuery(search);
    setCurrentPage(page);
  }, [location.search]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredBooks = useMemo(() => {
    if (!searchQuery) return allBooks;

    return allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allBooks]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setCurrentPage(1);

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    navigate({ search: params.toString() });
  };

  const handleToggleFavorite = useCallback(
    (id: number) => {
      setFavorites((prev: number[]) => {
        const updatedFavorites = prev.includes(id)
          ? prev.filter((fid: number) => fid !== id)
          : [...prev, id];
        return updatedFavorites;
      });
    },
    [setFavorites]
  );

  const handleAddBook = useCallback(
    (book: Omit<Book, "id">) => {
      const newBook = { id: Date.now(), ...book };
      setLocalBooks((prevBooks: Book[]) => [...prevBooks, newBook]);
      setAllBooks((prevBooks) => [...prevBooks, newBook]);
    },
    [setLocalBooks]
  );

  const handleEditClick = useCallback((book: Book) => {
    setEditingBook({
      ...book,
      publicationDate: formatDate(book.publicationDate),
    });
    setIsModalOpen(true);
  }, []);

  const handleEditBook = useCallback((updatedBook: Book) => {
    setAllBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  }, []);

  const handleDeleteClick = (book: number) => {
    setBookToDelete(book);
    setDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteBook = useCallback(() => {
    if (bookToDelete) {
      const remainingBooks = filteredBooks.filter(
        (book) => book.id !== bookToDelete
      );
      setLocalBooks((prevBooks: Book[]) =>
        prevBooks.filter((book) => book.id !== bookToDelete)
      );
      setAllBooks(remainingBooks);
      if (remainingBooks.length % 5 === 0) {
        setCurrentPage(remainingBooks.length / 5);
        navigate(`?page=${remainingBooks.length / 5}`);
      }
      setBookToDelete(null);
      setDeleteModalOpen(false);
    }
  }, [bookToDelete]);

  const handleFormSubmit = useCallback(
    (data: Omit<Book, "id">) => {
      if (editingBook) {
        handleEditBook({ ...editingBook, ...data });
        setEditingBook(null);
      } else {
        handleAddBook(data);
      }
    },
    [editingBook, handleEditBook, handleAddBook]
  );

  return (
    <div>
      <div className="wrapper">
        <BookList
          openModal={openModal}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          deleteModalOpen={handleDeleteClick}
          allBooks={filteredBooks}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          editModalOpen={handleEditClick}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <BookForm
          initialValues={editingBook || undefined}
          onSubmit={handleFormSubmit}
          buttonLabel={editingBook ? "Save Changes" : "Add Book"}
          closeModal={closeModal}
        />
      </Modal>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteBook}
      />
    </div>
  );
};

export default Home;
