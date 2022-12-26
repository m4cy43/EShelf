import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shelf from "./pages/Shelf";
import Book from "./pages/Book";
import Author from "./pages/Author";
import NewBookForm from "./pages/NewBookForm";
import VerifyList from "./pages/VerifyList";
import BookingList from "./pages/BookingList";
import DebtList from "./pages/DebtList";
import SetAdmin from "./pages/SetAdmin";
import PersonalAccount from "./pages/PersonalAccount";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Shelf />} />
            <Route path="/book/:uuid" element={<Book />} />
            <Route path="/author/:uuid" element={<Author />} />
            <Route path="/newbook" element={<NewBookForm />} />
            <Route path="/verifylist" element={<VerifyList />} />
            <Route path="/bookinglist" element={<BookingList />} />
            <Route path="/debtlist" element={<DebtList />} />
            <Route path="/setadmin" element={<SetAdmin />} />
            <Route path="/me" element={<PersonalAccount />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
