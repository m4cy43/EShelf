import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuthorBooks, resetBooks } from "../features/book/bookSlice";
import Spinner from "../components/Spinner";
import AuthorTableLine from "../components/AuthorTableLine";
import "./css/tables.css";

function Author() {
  const { uuid } = useParams();

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

    if (!user) {
      navigate("/login");
    }

    dispatch(getAuthorBooks(uuid));

    return () => {
      dispatch(resetBooks());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>
        {books[0].authors[0].surname} {books[0].authors[0].name}{" "}
        {books[0].authors[0].middlename}
      </h2>
      <main>
        <div className="table-box">
          <h5>{books.length} books found</h5>
          <table>
            <tbody>
              <tr>
                <th>Num</th>
                <th>Title</th>
                <th>Year</th>
                <th>Genres</th>
                <th>Section</th>
              </tr>
              {books ? (
                books.map((book) => (
                  <AuthorTableLine book={book} key={book.uuid} />
                ))
              ) : (
                <AuthorTableLine
                  book={{
                    number: "",
                    title: "",
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

export default Author;
