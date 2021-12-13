/* api */
import { BooksAPI } from "../../Api";

export const getAllBooks = async () => {
  try {
    return await BooksAPI.getAllBooks();
  } catch (err) {
    console.log("Error getting all books", err);
  }
};

export const searchBooks = async (searchValue) => {
  try {
    return await BooksAPI.searchBooks({
      query: searchValue,
    });
  } catch (err) {
    console.log("Error searching books", err);
  }
};

export const getPopularBooks = async () => {
  try {
    return await BooksAPI.getPopularBooks();
  } catch (err) {
    console.log("Error getting popular books", err);
  }
};

export const getNewBooks = async () => {
  try {
    return await BooksAPI.getNewBooks();
  } catch (err) {
    console.log("Error getting new books", err);
  }
};

export const getBookById = async (id) => {
  try {
    return await BooksAPI.getBookById(id);
  } catch (err) {
    console.log("Error fetching book by id", err);
  }
};

export const borrowBook = async (body) => {
  try {
    return await BooksAPI.borrowBook(body);
  } catch (err) {
    console.log("Error sending a borrow book request", err);
  }
};

export const getGenres = async () => {
  try {
    return await BooksAPI.getGenres();
  } catch (err) {
    console.log("Error fetching genres", err);
  }
};

export const addNewBook = async (book) => {
  try {
    return await BooksAPI.addNewBook(book);
  } catch (err) {
    console.log("Error adding new book", err);
  }
};

export const deleteBook = async (id) => {
  try {
    return await BooksAPI.deleteBook(id);
  } catch (err) {
    console.log("Error deleting a book", err);
  }
};

export const returnBook = async (body) => {
  try {
    return await BooksAPI.returnBook(body);
  } catch (err) {
    console.log("Error sending a return book request", err);
  }
};
