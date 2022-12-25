import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, resetBooks } from "../features/book/bookSlice";
import Spinner from "../components/Spinner";
import TableLine from "../components/TableLine";
import "./css/tables.css";

function Shelf() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user || user.uuid === "") {
      navigate("/login");
    }

    dispatch(getAllBooks());

    return () => {
      dispatch(resetBooks());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Shelf</h2>
      <main>
        <div className="table-box">
          <h5>{books.length} books found</h5>
          <table>
            <tbody>
              <tr>
                <th>Num</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genres</th>
                <th>Section</th>
              </tr>
              {books ? (
                books.map((book) => <TableLine book={book} key={book.uuid} />)
              ) : (
                <TableLine
                  book={{
                    number: "",
                    title: "",
                    authors: [{ name: "", surname: "", middlename: "" }],
                    year: "",
                    genres: [{ genreName: "" }],
                    section: { sectionName: "" },
                  }}
                  key={""}
                />
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Shelf;
