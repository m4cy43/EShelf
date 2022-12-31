import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import "./css/tables.css";
import {
  getAllSections,
  deleteSection,
} from "../features/additional/addSlice";

function SectionsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { sections, isLoading, isError, message } = useSelector(
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

    dispatch(getAllSections());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const del = (uuid) => {
    dispatch(deleteSection(uuid));
    window.location.reload(true);
  };

  return (
    <>
      <h2>Sections list</h2>
      <main>
        <div>
          <input
            type="submit"
            name="button"
            value="Create section"
            onClick={() => {
              navigate("/createsection");
            }}
          />
        </div>
        <div className="table-box">
          <h5>{sections.length} sections found</h5>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Genres</th>
              </tr>
              {sections ? (
                sections.map((section) => (
                  <tr key={section.uuid}>
                    <td>
                      <input
                        type="submit"
                        value="x"
                        onClick={() => {
                          del(section.uuid);
                        }}
                      />
                    </td>
                    <td>
                      {section.sectionName}
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

export default SectionsList;
