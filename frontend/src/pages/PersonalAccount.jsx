import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBoth, resetDebts } from "../features/debt/debtSlice";
import Spinner from "../components/Spinner";
import "./css/account.css";
import PersonalDebtLine from "../components/PersonalDebtLine";

function PersonalAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { debts, isLoading, isError, message } = useSelector(
    (state) => state.debts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user || user.uuid === "") {
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

  const changeCred = () => {
    navigate("/chngcred");
  }

  return (
    <>
      <h2>Personal Account</h2>
      <main>
        <div className="account-box">
          <div className="personal-data-box">
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
              <input type="button" value="Change credentials" onClick={changeCred} />
            </div>
          </div>
          <div className="debt-list-box">
            <h5>{debts.user.length !==0 ? debts.user[0].books.length : 0} books in this list</h5>
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
                  {debts.user.length !== 0 ? (
                    debts.user[0].books.map((debt) => (
                      <PersonalDebtLine debt={debt} key={debt.uuid} />
                    ))
                  ) : (
                    <PersonalDebtLine
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
        </div>
      </main>
    </>
  );
}

export default PersonalAccount;
