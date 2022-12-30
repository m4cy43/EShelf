import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./css/newbook.css";
import Select from "react-select";
import Spinner from "../components/Spinner";
import {
  getAllAuthors,
  getAllGenres,
  getAllSections,
  resetAdd,
} from "../features/additional/addSlice";
import { createBook } from "../features/book/bookSlice";

function NewBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: [],
    year: 0,
    number: 0,
    genre: [],
    section: "",
    description: "",
  });

  const { title, author, year, number, genre, section, description } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authors, genres, sections, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.add);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || user.uuid === "") {
      navigate("/login");
    }
    if (!user.isAdmin) {
      navigate("/");
    }
    if (isError) {
      console.error(message);
    }

    dispatch(getAllAuthors());
    dispatch(getAllGenres());
    dispatch(getAllSections());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  let numberOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
  ];

  let authorsOptions = authors.map((el) => {
    return {
      value: el.uuid,
      label: `${el.surname} ${el.name} ${el.middlename}`,
    };
  });

  let genresOptions = genres.map((el) => {
    return {
      value: el.uuid,
      label: el.genreName,
    };
  });

  let sectionsOptions = sections.map((el) => {
    return {
      value: el.uuid,
      label: el.sectionName,
    };
  });

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSelectChangeAuthors = (data) => {
    let val = [];
    data.map((el) => val.push(el.value));
    setFormData((previousState) => ({
      ...previousState,
      author: val,
    }));
  };
  const onSelectChangeGenres = (data) => {
    let val = [];
    data.map((el) => val.push(el.value));
    setFormData((previousState) => ({
      ...previousState,
      genre: val,
    }));
  };
  const onSelectChangeNumber = (data) => {
    setFormData((previousState) => ({
      ...previousState,
      number: data.value,
    }));
  };
  const onSelectChangeSection = (data) => {
    setFormData((previousState) => ({
      ...previousState,
      section: data.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title,
      year,
      description,
      number,
      section,
      authors: author,
      genres: genre,
    };
    navigate("/");
    dispatch(resetAdd());
    dispatch(createBook(bookData));
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
              <input
                type="text"
                name="year"
                placeholder="Year"
                onChange={onChange}
              />
            </div>
            <div className="second-row">
              <Select
                placeholder="Choose authors"
                isMulti
                options={authorsOptions}
                onChange={onSelectChangeAuthors}
                className="react-select-container"
                classNamePrefix="react-select"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary25: "#68b16f",
                    primary: "#d6d6d6",
                  },
                })}
              />
              <Select
                placeholder="Choose genres"
                isMulti
                options={genresOptions}
                onChange={onSelectChangeGenres}
                className="react-select-container"
                classNamePrefix="react-select"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary25: "#68b16f",
                    primary: "#d6d6d6",
                  },
                })}
              />
            </div>
            <div className="third-row">
              <Select
                placeholder="Choose number"
                options={numberOptions}
                onChange={onSelectChangeNumber}
                className="react-select-container"
                classNamePrefix="react-select"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary25: "#68b16f",
                    primary: "#d6d6d6",
                  },
                })}
              />
              <Select
                placeholder="Choose section"
                options={sectionsOptions}
                onChange={onSelectChangeSection}
                className="react-select-container"
                classNamePrefix="react-select"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary25: "#68b16f",
                    primary: "#d6d6d6",
                  },
                })}
              />
            </div>
            <div className="fourth-row">
              <textarea
                type="text"
                name="description"
                placeholder="Add description"
                onChange={onChange}
              />
            </div>
            <input
              type="submit"
              name="button"
              value="Enter"
              onClick={onSubmit}
            />
          </form>
        </div>
      </main>
    </>
  );
}

export default NewBookForm;
