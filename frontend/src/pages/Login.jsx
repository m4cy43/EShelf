import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/authentication/authSlice";
import "./css/form.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  };

  return (
    <>
      <h2>LogIn</h2>
      <main>
        <div className="login-box">
          <h4>SignIn</h4>
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
            <input type="submit" name="button" value="Enter" />
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
