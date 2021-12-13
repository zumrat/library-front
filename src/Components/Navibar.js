import {
  Nav,
  Container,
  Navbar,
  Button,
  Form,
  NavDropdown,
} from "react-bootstrap";
import { useContext, useEffect } from "react";
import { BookContext } from "./Books/Context";
import { useLocation } from "react-router-dom";

export default function NaviBar() {
  const {
    _searchBooks,
    _searchBooksQ,
    onSearchValueChanged,
    genres,
    _getGenres,
  } = useContext(BookContext);

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    _getGenres();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="http://localhost:3000/">
          <img
            src="https://i.ibb.co/KV8BqkY/zaychik.gif"
            width="40"
            height="61"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Brand href="http://localhost:3000/">
          <h5>The Reading Cafe</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Genres" id="collasible-nav-dropdown">
              {location.pathname !== "/about" &&
                genres?.map((genre) => (
                  <NavDropdown.Item
                    onClick={(e) => {
                      _searchBooksQ(genre);
                    }}
                  >
                    {genre}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
            <Nav.Link href="/popular">Popular</Nav.Link>
            <Nav.Link href="/new">New</Nav.Link>
            <Nav.Link href="/books">All Books</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                _searchBooks();
              }}
            >
              <Form.Control
                onChange={onSearchValueChanged}
                type="search"
                placeholder="Search"
              />
            </Form>
            <Button variant="primary" className="mr-2" onClick={_searchBooks}>
              Search
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
