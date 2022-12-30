import DebtsTableLine from "../components/DebtsTableLine";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDebts,
  resetDebts,
  deleteUserDebt,
} from "../features/debt/debtSlice";
import { Link, redirect, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function DebtList() {
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

    if (!user.isAdmin) {
      navigate("/");
    }

    dispatch(getAllDebts());

    return () => {
      dispatch(resetDebts());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const deletedebt = (uUuid, bUuid) => {
    let query = { usr: uUuid, bok: bUuid };
    dispatch(deleteUserDebt(query));
    window.location.reload(true);
    console.log(query);
  };

  return (
    <>
      <h2>Debt list</h2>
      <main>
        <div className="table-box">
          <h5>{debts.user.length} users in list</h5>
          <div className="debt-list">
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Deadline</th>
                  <th>Surname - Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Title</th>
                  <th>Authors</th>
                  <th>Year</th>
                </tr>
                {debts.user !== [] ? (
                  debts.user.map((usr) =>
                    usr.books.map((bok) => (
                      <DebtsTableLine
                        user={usr}
                        book={bok}
                        approve={deletedebt}
                        decline={false}
                        key={bok.debt.uuid}
                      />
                    ))
                  )
                ) : (
                  <DebtsTableLine
                    user={{
                      uuid: "",
                      name: "",
                      surname: "",
                      email: "",
                      phone: "",
                    }}
                    book={{
                      uuid: "",
                      title: "",
                      authors: [
                        { uuid: "", name: "", surname: "", middlename: "" },
                      ],
                      year: "",
                      debt: {
                        uuid: "",
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

export default DebtList;
