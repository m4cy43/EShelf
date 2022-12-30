import VerifyTableLine from "../components/VerifyTableLine";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin, resetUsers, getNotAdmin } from "../features/user/userSlice";
import { Link, redirect, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function SetAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user
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

    dispatch(getNotAdmin());

    return () => {
      dispatch(resetUsers());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const verify = (query) => {
    dispatch(setAdmin(query));
    window.location.reload(true);
  };

  return (
    <>
      <h2>Set admins</h2>
      <main>
        <div className="table-box">
          <h5>{users.length} users in list</h5>
          <div className="debt-list">
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Surname - Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
                {users || users.length > 0 ? (
                  users.map((user) => (
                    <VerifyTableLine
                      user={user}
                      verify={verify}
                      key={user.uuid}
                    />
                  ))
                ) : (
                  <VerifyTableLine
                    user={{
                      updatedAt: "",
                      name: "",
                      surname: "",
                      email: "",
                      phone: "",
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

export default SetAdmin;
