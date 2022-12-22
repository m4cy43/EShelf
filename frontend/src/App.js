import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shelf from "./pages/Shelf";
import Book from "./pages/Book";
import Author from "./pages/Author";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Shelf/>}/>
            <Route path="/book/:uuid" element={<Book/>}/>
            <Route path="/author/:uuid" element={<Author/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
