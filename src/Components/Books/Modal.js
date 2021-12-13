import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { borrowBook } from "../../Core/Services/BooksService";
import Borrow from "./Borrow";

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
  backgroundColor: "rgba(0, 0, 0, .7",
  zIndex: 1000,
};

const DEFAULT_REQUEST = {
  reserveDate: null,
  dueDate: null,
  reader: {
    email: null,
    address: null,
    fullName: null,
    phoneNumber: null,
  },
  book: {
    id: null,
  },
};

export default function Modal({ open, children, onClose, bookId }) {
  const [request, updateRequest] = useState(DEFAULT_REQUEST);
  const [isInProgress, setInProgress] = useState(false);
  if (!open) return null;

  request.book.id = bookId;

  const _borrowBook = async () => {
    try {
      if (isInProgress) {
        return;
      }
      setInProgress(true);
      await borrowBook(request);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setInProgress(false);
    }
  };

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
          <h1> Reader details </h1>
        </div>
        <p></p>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
          <FormControl
            aria-label="Name"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              updateRequest(() => {
                request.reader.fullName = e.target.value;
                return request;
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
          <FormControl
            aria-label="Surname"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              updateRequest(() => {
                request.reader.email = e.target.value;
                return request;
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
          <FormControl
            aria-label="Phone"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              updateRequest(() => {
                request.reader.phoneNumber = e.target.value;
                return request;
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
          <FormControl
            aria-label="Address"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              updateRequest(() => {
                request.reader.address = e.target.value;
                return request;
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Reserve Date</InputGroup.Text>
          <FormControl
            type="date"
            aria-label="Reserve Date"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              updateRequest(() => {
                request.reserveDate = e.target.value;
                return request;
              })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Due Date</InputGroup.Text>
          <FormControl
            type="date"
            aria-label="Due Date"
            aria-describedby="basic-addon1"
            onChange={(e) =>
              updateRequest(() => {
                request.dueDate = e.target.value;
                return request;
              })
            }
          />
        </InputGroup>
        <div
          className="float-right"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={_borrowBook} variant="success">
            Borrow
          </Button>
          {children}
          <Button onClick={onClose} variant="danger">
            Cancel
          </Button>
          {children}
        </div>
      </div>
    </>
  );
}
