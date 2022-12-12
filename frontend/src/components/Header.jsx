import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

function Header() {
  return (
    <header>
      <IconContext.Provider value={{ color: "#e8f92e", size: "150px" }}>
        <FiMenu />
      </IconContext.Provider>

      <input type="text" />
      <HiMagnifyingGlass />
      <Link to="/">
        <div className="logo">EShelf</div>
      </Link>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
