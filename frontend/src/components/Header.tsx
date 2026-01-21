import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 mb-10 header">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo main */}
        <div className="logo text-2xl font-bold">
          <Link to="/">myMern App</Link>
        </div>
        {/* menu botton */}
        <ul className="flex items-center space-x-6">
          <li className="flex items-center gap-2 hover:text-gray-300">
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-gray-300">
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
