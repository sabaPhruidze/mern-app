import { Link,useNavigate } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../store/store";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { logout,reset } from "../store/slices/authSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  
  const onLogout = () => {
    dispatch(logout());//remove user and token from localStorage
    dispatch(reset()); // cleaning status
    navigate('/login')//navigate on login page
  }
  return (
    <header className="bg-gray-800 text-white p-4 mb-10 header">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo main */}
        <div className="logo text-2xl font-bold">
          <Link to="/">myMern App</Link>
        </div>
        {/* menu botton */}
        <ul className="flex items-center space-x-6">
         {user ? (
           <>
           <li className="font-medium text-gray-300">
            Hi, {user.name}
           </li>
           <li>
            <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer">
              Logout
            </button>
           </li>
           </>
         )
         : (
           <>
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
           </>
         )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
