import {useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import "./css/form.css";
import { createAuthor, resetAdd } from "../features/additional/addSlice";
import { toast } from "react-toastify";

function CreateNewAuthor() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    middlename: "",
  });

  const { name, surname, middlename } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { authors, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.add
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (!user || user.uuid === "") {
      navigate("/login");
    }

    if (!user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate, isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    const data = {
      name,
      surname,
      middlename,
    };

    await dispatch(createAuthor(data));
    await dispatch(resetAdd());
    await navigate("/authorslist");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Create new author</h2>
      <main>
      <div className="form-box">
          <h4>Author</h4>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="surname"
              placeholder="Enter surname"
              onChange={onChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={onChange}
            />
            <input
              type="text"
              name="middlename"
              placeholder="Enter middlename"
              onChange={onChange}
            />
            <input type="submit" name="button" value="Enter" />
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateNewAuthor;
