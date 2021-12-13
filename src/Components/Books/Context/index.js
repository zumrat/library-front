import React, { useState, createContext } from "react";
import {
  getAllBooks,
  getPopularBooks,
  searchBooks,
  getNewBooks,
  getBookById,
  borrowBook,
  getGenres,
} from "../../../Core/Services/BooksService";

export const BookContext = createContext();

export const BookProvider = (props) => {
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState({});
  const [isInProgress, setInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [genres, setGenres] = useState(null);

  const updateBooks = (sort) => {
    switch (sort) {
      case "popular":
        return _getPopularBooks();
      case "new":
        return _getNewBooks();
      default:
        return _getAllBooks();
    }
  };

  const _getAllBooks = () => {
    return _makeCall(getAllBooks);
  };

  const _getPopularBooks = () => {
    return _makeCall(getPopularBooks);
  };

  const _getNewBooks = () => {
    return _makeCall(getNewBooks);
  };

  const onSearchValueChanged = (e) => {
    setSearchValue(e.target.value);
  };

  const _searchBooksQ = (query) => {
    return _makeCall(() => searchBooks(query));
  };

  const _searchBooks = () => {
    return _makeCall(() => searchBooks(searchValue));
  };

  const _makeCall = async (call) => {
    try {
      setInProgress(true);
      const data = await call();
      setBooks(data);
    } catch (err) {
      console.log(err);
      setBooks([]);
    } finally {
      setInProgress(false);
    }
  };

  const _getBookById = async (id) => {
    const book = await getBookById(id);
    setBook(book);
  };

  const _borrowBook = async (body) => {
    await borrowBook(body);
  };

  const _getGenres = async () => {
    const genres = await getGenres();
    setGenres(genres);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        updateBooks,
        isInProgress,
        _searchBooks,
        _searchBooksQ,
        onSearchValueChanged,
        setSearchValue,
        book,
        _getBookById,
        _borrowBook,
        genres,
        _getGenres,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};
