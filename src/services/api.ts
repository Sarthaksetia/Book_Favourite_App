import type { Book } from "@utils/types";

const API_BASE_URL = "https://my-json-server.typicode.com/cutamar/mock";

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }
};

export const fetchBookDetail = async (id: number): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch book with id ${id}:`, error);
    throw error;
  }
};
