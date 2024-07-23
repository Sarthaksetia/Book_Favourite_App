import React, { createContext, ReactNode, useContext } from "react";
import { Book } from "@utils/types";
import useFetch from "@utils/useFetch";

type BookContextProps = {
  books: Book[] | null;
  loading: boolean;
  error: string | null;
};

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: books, loading, error } = useFetch<Book[]>("/books");

  return (
    <BookContext.Provider value={{ books, loading, error }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = (): BookContextProps => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
