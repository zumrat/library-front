import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBook, returnBook } from "../../Core/Services/BooksService";
import Book from "./Book";
import { BookContext } from "./Context";
import Modal from "./Modal";

const BookDetails = () => {
  const { id } = useParams();
  const { book, _getBookById } = useContext(BookContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    _getBookById(id);
  }, [id]);

  const _deleteBook = async () => {
    await deleteBook(book.id);
  };

  const _returnBook = async () => {
    await returnBook({ book: { id: book.id }, });
  };

  return (
    <>
      <div class="d-flex justify-content-center pt-4">
        <div class="col-md-6 col-md-offset-3">
          <div class="card">
            <div class="row no-gutters">
              <div class="col-auto">
                <Card style={{ width: "24rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      book?.pictureUrl ||
                      "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                    }
                  />
                </Card>
              </div>
              <div class="col">
                <div class="card-block px-2">
                  <Card.Body>
                    <Card.Title>
                      <b>
                        <h4>{book?.title}</h4>
                      </b>
                    </Card.Title>
                    <Card.Subtitle>{book?.authorDto?.fullName}</Card.Subtitle>
                    <p></p>
                    <div>
                      <Card.Text>{book?.description}</Card.Text>
                    </div>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem></ListGroupItem>
                    <ListGroupItem>
                      <b>Genre:</b> {book?.genres?.join(", ")}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>Edition:</b> {book?.edition}
                    </ListGroupItem>
                    <ListGroupItem>
                      <b>ISBN:</b> {book?.isbn}
                    </ListGroupItem>
                    <ListGroupItem></ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <div>
                      <Card.Subtitle>{book?.bookStatus}</Card.Subtitle>
                      <p></p>
                      <Row>
                        <Col xs={9}>
                          <Button
                            disabled={book?.bookStatus !== "AVAILABLE"}
                            onClick={() => setIsOpen(true)}
                            variant="success"
                          >
                            Borrow
                          </Button>
                          <Modal
                            bookId={book?.id}
                            open={isOpen}
                            onClose={() => {
                              setIsOpen(false);
                              _getBookById(id);
                            }}
                          />
                          <Button
                            variant="danger"
                            onClick={async () => {
                              await _deleteBook(book.id);
                              navigate(`/books`);
                            }}
                          >
                            Delete Book
                          </Button>{" "}
                        </Col>
                        <Col>
                          <Button variant="warning" onClick={async () => {
                            await _returnBook();
                            _getBookById(id);
                          }}>Return</Button>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center pt-4">
        <div class="col-md-6 col-md-offset-3">
          <div class="d-flex justify-content-center">
            <h3>Other books from this author</h3>
          </div>
          <div class="d-flex flex-row justify-content-flex-start align-items-center">
            {book.authorDto?.books.map((book) => (
              <Book book={book} key={book.id} />
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
