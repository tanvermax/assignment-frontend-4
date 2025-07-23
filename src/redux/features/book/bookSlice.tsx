import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../../../types";
import type { RootState } from "@/redux/store";
import { v4 as uuidv4 } from 'uuid';

interface initialState {
  book: IBook[];  // Note: singular "book" but it's an array
};

const initialState: initialState = {
  book: [
    
  ]
};

// Fixed DraftBook type (removed duplicate "titile")
type DraftBook = Pick<IBook, "title" | "author" | "genre" | "isbn" | "description" | "copies" | "available">;

const createBook = (bookData: DraftBook): IBook => {
  return {
    ...bookData,
    id: uuidv4(), // Better ID generation
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