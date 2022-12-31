import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import "./css/tables.css";
import {
  getAllAuthors,
  deleteAuthor,
} from "../features/additional/addSlice";

function AuthorsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { authors, isLoading, isError, message } = useSelector(
    (state) => state.add
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

    dispatch(getAllAuthors());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const del = (uuid) => {
    dispatch(deleteAuthor(uuid));
    window.location.reload(true);
  };

  return (
    <>
      <h2>Authors list</h2>
      <main>
        <div>
          <input
            type="submit"
            name="button"
            value="Create author"
            onClick={() => {
              navigate("/createauthor");
            }}
          />
        </div>
        <div className="table-box">
          <h5>{authors.length} authors found</h5>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Authors</th>
              </tr>
              {authors ? (
                authors.map((author) => (
                  <tr key={author.uuid}>
                    <td>
                      <input
                        type="submit"
                        value="x"
                        onClick={() => {
                          del(author.uuid);
                        }}
                      />
                    </td>
                    <td>
                      {author.surname} {author.name} {author.middlename}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default AuthorsList;
