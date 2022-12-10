import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  return (
    <header>
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
