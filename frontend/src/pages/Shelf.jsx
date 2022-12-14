import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, reset } from "../features/book/bookSlice";
import TableLine from "../components/TableLine";
import "./css/tables.css";

function Shelf() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { books, isError, message } = useSelector((state) => state.books);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getAllBooks());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <h2>Shelf</h2>
      <main>
        <div className="table-box">
          <h5>Section</h5>
          <table>
            <tbody>
              <tr>
                <th width="5%">Number</th>
                <th width="30%">Title</th>
                <th width="20%">Author</th>
                <th width="5%">Year</th>
                <th width="25%">Genres</th>
                <th width="15%">Section</th>
              </tr>
              {books.map((book) => (
                <TableLine book={book} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Shelf;
