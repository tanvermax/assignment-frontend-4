import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../../../types";
import type { RootState } from "@/redux/store";

interface initialState {
  book: IBook[];  // Note: singular "book" but it's an array
};

const initialState: initialState = {
  book: [
    {
      id: "ibfiwbcbwqacb",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      isbn: 9780743273565,
      description: "A story of wealth, love, and the American Dream in the 1920s.",
      copies: 15,
      available: true
    },
    {
      id: "qwerty123456",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      isbn: 9780061120084,
      description: "A powerful story of racial injustice and moral growth in the American South.",
      copies: 12,
      available: true
    },
  ]
};

// Fixed DraftBook type (removed duplicate "titile")
type DraftBook = Pick<IBook, "title" | "author" | "genre" | "isbn" | "description" | "copies" | "available">;

const createBook = (bookData: DraftBook): IBook => {
  return {
    ...bookData,
    id: Math.random().toString(36).substring(2, 9), // Better ID generation
    available: bookData.available ?? false
  };
};

// Changed slice name to "books" to match what you want to access
const bookSlice = createSlice({
  name: "books",  // Changed from "counter" to "books"
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<DraftBook>) => {
      const bookData = createBook(action.payload);
      state.book.push(bookData);
    },
  },
});

export const { addBook } = bookSlice.actions;

// Corrected selector to match the actual state structure
export const selectBook = (state: RootState): IBook[] => {
  return state.books.book;  // Now accesses state.books.book
};

export default bookSlice.reducer;