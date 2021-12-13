import React, { useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { addNewBook } from "../Core/Services/BooksService";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "10px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const DEFAULT_BOOK = {
  title: "",
  authorDto: {
    fullName: "",
  },
  description: "",
  genres: [],
  edition: "",
  isbn: "",
  pictureUrl: "",
};

export default function Modal2({ open, children, onClose }) {
  const [newBook, setNewBook] = useState(DEFAULT_BOOK);
  const [isInProgress, setInProgress] = useState(false);
  const { title, authorDto, genres, isbn, pictureUrl, edition, description } =
    newBook;
  const isDisabled = !title || !authorDto.fullName || !genres.length || !isbn;

  const _addNewBook = async () => {
    try {
      if (isInProgress) {
        return;
      }
      setInProgress(true);
      await addNewBook(newBook);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setInProgress(false);
    }
  };

  const handleGenres = (str) => {
    const splitted = str.split(", ");
    setNewBook({ ...newBook, genres: splitted });
  };

  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1> Add Book </h1>
        </div>

        <Form validated={isDisabled} onSubmit={_addNewBook}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <FormControl
              aria-label="Title"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              value={title}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a title.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Author</InputGroup.Text>
            <FormControl
              aria-label="Author"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  authorDto: { fullName: e.target.value },
                })
              }
              value={authorDto.fullName}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter an author.
            </Form.Control.Feedback>
          </InputGroup>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
              value={description}
            />
          </FloatingLabel>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Genres</InputGroup.Text>
            <FormControl
              aria-label="Author"
              aria-describedby="basic-addon1"
              onChange={(e) => handleGenres(e.target.value)}
              value={genres.join(", ")}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a genre.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Edition</InputGroup.Text>
            <FormControl
              aria-label="Edition"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setNewBook({ ...newBook, edition: e.target.value })
              }
              value={edition}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">ISBN</InputGroup.Text>
            <FormControl
              aria-label="ISBN"
              aria-describedby="basic-addon1"
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              value={isbn}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter an isbn.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Picture Url</InputGroup.Text>
            <FormControl
              aria-label="Picture Url"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setNewBook({ ...newBook, pictureUrl: e.target.value })
              }
              value={pictureUrl}
            />
          </InputGroup>

          <div
            className="float-right"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button type="submit" variant="success" disabled={isDisabled}>
              Add Book
            </Button>
            {children}
            <Button onClick={onClose} variant="danger">
              Cancel
            </Button>
            {children}
          </div>
        </Form>
      </div>
    </>
  );
}
