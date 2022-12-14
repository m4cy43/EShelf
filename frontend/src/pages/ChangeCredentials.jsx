import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, changeCred } from "../features/authentication/authSlice";
import { toast } from "react-toastify";
import "./css/form.css";

function ChangeCredentials() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
    phone: "",
  });

  const { email, password, password2, name, surname, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
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

    if (isSuccess) {
      navigate("/me");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const userData = {
        email,
        password,
        name,
        surname,
        phone,
      };
      dispatch(changeCred(userData));
    }
  };

  return (
    <>
      <h2>Change Credentials</h2>
      <main>
        <div className="form-box">
          <h4>User Data</h4>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Repeat your password"
              onChange={onChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={onChange}
            />
            <input
              type="text"
              name="surname"
              placeholder="Enter your surname"
              onChange={onChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={onChange}
            />
            <input type="submit" name="button" value="Enter" />
          </form>
        </div>
      </main>
    </>
  );
}

export default ChangeCredentials;
