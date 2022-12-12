import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import "./css/header.css";

function Header() {
  return (
    <header>
      <div className="navigation">
        <IconContext.Provider value={{ color: "#e8f92e", size: "1.5em" }}>
          <FiMenu />
        </IconContext.Provider>
        <input type="text" />
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
      </div>
    </header>
  );
}

export default Header;
