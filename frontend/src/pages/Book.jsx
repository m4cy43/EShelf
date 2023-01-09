import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBook,
  oneBook,
  resetBooks,
  incBookNum,
  decBookNum,
} from "../features/book/bookSlice";
import Spinner from "../components/Spinner";
import "./css/book.css";
import {
  bookTheBook,
  oneBookDebt,
  resetDebts,
  unbookTheBook,
} from "../features/debt/debtSlice";

function Book() {
  const { uuid } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { book, isLoading, isError, message } = useSelector(
    (state) => state.books
  );
  const { debts } = useSelector((state) => state.debts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user || user.uuid === "") {
      navigate("/login");
    }

    dispatch(oneBookDebt(uuid));
    dispatch(oneBook(uuid));

    return () => {
      dispatch(resetDebts());
      dispatch(resetBooks());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const delTheBook = async () => {
    await dispatch(deleteBook(uuid));
    await navigate("/");
    return async () => {
      await dispatch(resetBooks());
    };
  };

  const takeBook = () => {
    dispatch(bookTheBook(uuid));
    return () => {
      dispatch(resetDebts());
    };
  };

  const unBook = () => {
    dispatch(unbookTheBook(uuid));
    return () => {
      dispatch(resetDebts());
    };
  };

  const incNum = () => {
    dispatch(incBookNum(uuid));
  };

  const decNum = () => {
    dispatch(decBookNum(uuid));
  };

  return (
    <>
      <h2>Book page</h2>
      <main>
        <div className="book-box">
          <div className="add-info">
            {user.isAdmin ? (
              <div className="number-buttons">
                <h5>{book.number} books in stock</h5>
                <input type="submit" value="+" onClick={incNum} />
                <input type="submit" value="-" onClick={decNum} />
              </div>
            ) : (
              <></>
            )}
            <h5>Section: {book.section ? book.section.sectionName : ""}</h5>
          </div>
          <div className="book-info">
            <h6>
              <span>Title:</span> {book.title}
            </h6>
            <h6>
              <span>Authors: </span>
              {book.authors.map((el) => {
                return (
                  <Link to={`../author/${el.uuid}`} key={el.uuid}>
                    {el.surname} {el.name} {el.middlename}
                  </Link>
                );
              })}
            </h6>
            <h6>
              <span>Year:</span> {book.year}
            </h6>
            <h6>
              <span>Genres:</span>{" "}
              {book.genres.map((el) => {
                return <a key={el.uuid}>{el.genreName}</a>;
              })}
            </h6>
            <h6>
              <span>Description:</span> {book.description}
            </h6>
          </div>
          <div className="book-bottom-panel">
            {user.isAdmin ? (
              <input
                type="submit"
                value="Delete the book"
                onClick={delTheBook}
              />
            ) : user.isVerified ? (
              debts.user[0] ? (
                debts.user[0].books[0].debt.isBooked ? (
                  <input
                    type="submit"
                    value="The book is booked"
                    onClick={unBook}
                  />
                ) : (
                  <input type="submit" value="The book is debted" />
                )
              ) : (
                <input type="submit" value="Take the book" onClick={takeBook} />
              )
            ) : (
              <input type="submit" value="Verify account first" />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Book;
