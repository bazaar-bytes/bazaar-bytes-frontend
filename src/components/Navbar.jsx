import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className=" bg-primary text-primary-content">
      <div className="flex justify-between h-20 items-center px-4">
        <div className="flex items-center space-x-2 w-1/4">
          <button className="flex items-center text-l py-1">☰</button>
        </div>

        <div className="flex justify-center w-1/2">
          <h1>BazaarBytes</h1>
        </div>

        <div className="w-1/4 flex justify-end mr-4">
          {isLoggedIn && (
            <button className="btn btn-ghost text-xl" onClick={logOutUser}>
              Log Out
            </button>
          )}
          {!isLoggedIn && (
            <div className="flex">
              <Link to="/login">
                <button className="btn btn-ghost text-xl">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-ghost text-xl">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
