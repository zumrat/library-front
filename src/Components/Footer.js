import { Container, Button, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import Modal2 from "./Modal2";

const Footer = () => {
  const styles = {
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={styles}
    >
      <Container>
        <Nav className="me-auto">
          <Button onClick={() => setIsOpen(true)} variant="primary">
            Add Book
          </Button>
          <Modal2 open={isOpen} onClose={() => setIsOpen(false)}></Modal2>
        </Nav>
        <Nav>
        <p class="text-white bg-dark">© 2021 Copyright. The Reading Cafe</p>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Footer;
