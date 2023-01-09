import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import "./css/form.css";
import { createGenre } from "../features/additional/addSlice";
import { toast } from "react-toastify";

function CreateNewGenre() {
  const [formData, setFormData] = useState({
    genreName: "",
  });

  const { genreName } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { genres, isSuccess, isLoading, isError, message } = useSelector(
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
      genreName,
    };

    await dispatch(createGenre(data));
    await navigate("/genreslist");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Create new genre</h2>
      <main>
        <div className="form-box">
          <h4>Genre</h4>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="genreName"
              placeholder="Enter genre"
              onChange={onChange}
            />
            <input type="submit" name="button" value="Enter" />
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateNewGenre;
