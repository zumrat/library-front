import React, { useEffect, useContext } from "react";
import "./index.css";
import { Container, Spinner } from "react-bootstrap";
import { BookContext } from "./Context";
import Book from "./Book";

export default function Books({ sort, title }) {
  const { books, updateBooks, isInProgress } = useContext(BookContext);

  useEffect(() => {
    updateBooks(sort);
  }, []);

  if (isInProgress) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <div class="d-flex justify-content-center pb-5 pt-4">
        <h1>{title}</h1>
      </div>
      <Container>
        <div className="books-container">
          {books?.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </div>
      </Container>
    </div>
  );
}
