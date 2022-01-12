import React, { useEffect, useState } from "react";
import "./index.css";
import { Container, Spinner } from "react-bootstrap";
import { getReadersList } from "../../Core/Services/ReadersService";
import { useNavigate } from "react-router-dom";

export default function Reader() {
  const [isInProgress, setInProgress] = useState(true);
  const [reader, setReader] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    _getReader();
  }, []);

  const _getReader = async () => {
    try {
      if (!isInProgress) {
        setInProgress(true);
      }
      const data = await getReadersList();
      setReader({ title: "123" });
    } catch (error) {
      setReader({ title: "123" });
    } finally {
      setInProgress(false);
    }
  };

  if (isInProgress) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  console.log(reader);

  return (
    <div>
      <div className="d-flex justify-content-center pb-5 pt-4">
        <h1>{reader.title}</h1>
      </div>
      <Container>
        <div className="readers-container"></div>
      </Container>
    </div>
  );
}
