import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import "./css/tables.css";
import {
  getAllGenres,
  deleteGenre,
} from "../features/additional/addSlice";

function GenresList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { genres, isLoading, isError, message } = useSelector(
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

    dispatch(getAllGenres());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const del = (uuid) => {
    dispatch(deleteGenre(uuid));
    window.location.reload(true);
  };

  return (
    <>
      <h2>Genres list</h2>
      <main>
        <div>
          <input
            type="submit"
            name="button"
            value="Create genre"
            onClick={() => {
              navigate("/creategenre");
            }}
          />
        </div>
        <div className="table-box">
          <h5>{genres.length} genres found</h5>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Genres</th>
              </tr>
              {genres ? (
                genres.map((genre) => (
                  <tr key={genre.uuid}>
                    <td>
                      <input
                        type="submit"
                        value="x"
                        onClick={() => {
                          del(genre.uuid);
                        }}
                      />
                    </td>
                    <td>
                      {genre.genreName}
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

export default GenresList;
