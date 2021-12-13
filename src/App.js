import "bootstrap/dist/css/bootstrap.min.css";
import NaviBar from "./Components/Navibar";
import Footer from "./Components/Footer";
import Books from "./Components/Books/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Popular from "./Components/Popular";
import NEW from "./Components/NEW";
import { BookProvider } from "./Components/Books/Context";
import BookDetails from "./Components/Books/BookDetails";
import "bootswatch/dist/sketchy/bootstrap.min.css"; // Added this :boom:

function App() {
  return (
    <Router>
      <BookProvider>
        <NaviBar />
        <div style={{ paddingBottom: "50px" }}>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/new" element={<NEW />} />
            <Route path="/books" element={<Books title={"All books"} />} />
            <Route path="/" element={<Books title={"The Reading Cafe"} />} />
            <Route path="books/:id" exact element={<BookDetails />} />
          </Routes>
        </div>
        <Footer />
      </BookProvider>
    </Router>
  );
}

export default App;
