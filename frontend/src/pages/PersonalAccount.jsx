import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBoth, resetBooks } from "../features/book/bookSlice";
import Spinner from "../components/Spinner";
import "./css/tables.css";
import {

  resetDebts,
} from "../features/debt/debtSlice";

function PersonalAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { debts, isLoading, isError, message  } = useSelector((state) => state.debts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getBoth());

    return () => {
      dispatch(resetDebts());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Personal Account</h2>
      <main>
        <div>
          <h5>Personal data</h5>
          <div className="personal-data">
            <h6>
              <span>Email: </span>
              {user.email}
            </h6>
            <h6>
              <span>Name: </span>
              {user.name}
            </h6>
            <h6>
              <span>Surname: </span>
              {user.surname}
            </h6>
            <h6>
              <span>Phone: </span>
              {user.phone}
            </h6>
            <input type="button" value="Change credentials" />
          </div>
        </div>
        <div>
          <h5>{} books in this list</h5>
          <div className="debt-list">
            <table>
              <tbody>
                <tr>
                  <th>Type</th>
                  <th>Deadline</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Year</th>
                </tr>
                {debts.user[0].books ? (
                  debts.user[0].books.map((debt) => (
                    <TableLine debt={debt} key={debt.uuid} />
                  ))
                ) : (
                  <TableLine
                    debt={{
                      title: "",
                      authors: [{ name: "", surname: "", middlename: "" }],
                      year: "",
                      debt: {
                        deadlineDate: "",
                        isDebted: false,
                        isBooked: false,
                      },
                    }}
                    key={""}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default PersonalAccount;
