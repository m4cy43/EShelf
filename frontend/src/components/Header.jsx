import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/authentication/authSlice";
import "./css/header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <div className="navigation">
        <IconContext.Provider value={{ color: "#e8f92e", size: "1.5em" }}>
          <FiMenu />
        </IconContext.Provider>
        <input type="text" placeholder="Search..."/>
        <IconContext.Provider value={{ color: "#e8f92e", size: "1.5em" }}>
          <HiMagnifyingGlass />
        </IconContext.Provider>
      </div>
      <div className="center">
        <Link id="react-link" to="/">
          <div className="logo">EShelf</div>
        </Link>
      </div>
      <div className="auth">
        {user ? (
          <>
            <IconContext.Provider value={{ color: "#e8f92e", size: "1em" }}>
              <FaSignOutAlt />
            </IconContext.Provider>
            <Link id="react-link" to="/login">
              <h4 onClick={onLogout}>LogOut</h4>
            </Link>
            <h4>({user.email})</h4>
          </>
        ) : (
          <>
            <IconContext.Provider value={{ color: "#e8f92e", size: "1em" }}>
              <FaSignInAlt />
            </IconContext.Provider>
            <Link id="react-link" to="/login">
              <h4>Login</h4>
            </Link>
            <IconContext.Provider value={{ color: "#e8f92e", size: "1em" }}>
              <FaUser />
            </IconContext.Provider>
            <Link id="react-link" to="/register">
              <h4>Register</h4>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
