import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./css/newbook.css";
function NewBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    authors: [],
    year: 0,
    number: 0,
    genres: [],
    section: "",
    description: "",
  });

  const { title, authors, year, number, genres, section, description } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title,
      authors,
      year,
      number,
      genres,
      section,
      description,
    };
  };

  return (
    <>
      <h2>New Book</h2>
      <main>
        <div className="form-box">
          <h4>Create new Book</h4>
          <form onSubmit={onSubmit}>
            <div className="first-row">
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                onChange={onChange}
              />
            </div>
            <div className="second-row">
              <input
                type="text"
                name="authors"
                placeholder="Enter authors"
                onChange={onChange}
              />
              <input
                type="text"
                name="year"
                placeholder="Enter year"
                onChange={onChange}
              />
            </div>
            <div className="third-row">
              <input
                type="text"
                name="number"
                placeholder="Choose number"
                onChange={onChange}
              />
              <input
                type="text"
                name="genres"
                placeholder="Chose genres"
                onChange={onChange}
              />
              <input
                type="text"
                name="section"
                placeholder="Chose section"
                onChange={onChange}
              />
            </div>
            <div className="fourth-row">
              <input
                type="text"
                name="description"
                placeholder="Add description"
                onChange={onChange}
              />
            </div>
            <input type="submit" name="button" value="Enter" />
          </form>
        </div>
      </main>
    </>
  );
}

export default NewBookForm;
