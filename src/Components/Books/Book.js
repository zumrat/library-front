import React from "react";
import book1 from "../../images/book1.jpg";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const navigate = useNavigate();

  return (    
    <div
      key={book.id}
      className="books-map-container"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <Image
        className="image"
        src={book.pictureUrl || book1}
        alt={`Book ${book.title}`}
        fluid
      />
      <div className="post-image">
        <span>{book.title}</span> <span>{book.bookStatus}</span>
      </div>
    </div>
  );
};

export default Book;
