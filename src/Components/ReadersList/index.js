import React, { useEffect, useState } from "react";
import "./index.css";
import { Container, Spinner } from "react-bootstrap";
import { getReadersList } from "../../Core/Services/ReadersService";
import { useNavigate } from "react-router-dom";

export default function ReadersList({ title }) {
  const [isInProgress, setInProgress] = useState(true);
  const [readersList, setReadersList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    _getReadersList();
  }, []);

  const _getReadersList = async () => {
    try {
      if (!isInProgress) {
        setInProgress(true);
      }
      const data = await getReadersList();
      setReadersList(data || []);
    } catch (error) {
      setReadersList([]);
    } finally {
      setInProgress(false);
    }
  };

  const openReader = (id) => {
    navigate(`/readers-list/${id}`);
  };

  if (isInProgress) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  console.log(readersList);

  return (
    <div>
      <div className="d-flex justify-content-center pb-5 pt-4">
        <h1>{title}</h1>
      </div>
      <Container>
        <div className="readers-container">
          {readersList?.map((reader) => (
            <div
              key={reader.id}
              onClick={() => openReader(reader.id)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "30%",
                flexWrap: "wrap",
                height: "30px",
                borderBottomWidth: "1px",
                borderBottomColor: "black",
              }}
            >
              <span
                style={{ fontSize: "16px", color: "black", textAlign: "left" }}
              >
                {reader.fullName}
              </span>
              <span
                style={{ fontSize: "24px", color: "black", textAlign: "right" }}
              >
                {">"}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
