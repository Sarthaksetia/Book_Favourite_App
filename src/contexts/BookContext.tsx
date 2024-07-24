import React, { createContext, type ReactNode } from "react";
import type { Book } from "@utils/types";
import useFetch from "@utils/useFetch";

type BookContextProps = {
  books: Book[] | null;
  loading: boolean;
  error: string | null;
};

export const BookContext = createContext<BookContextProps | undefined>(
  undefined
);

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
