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
          {!isLoggedIn && (
            <div>
              <Link to="/login">
                <button className="btn btn-ghost text-xl">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-ghost text-xl">Sign Up</button>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="flex">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between ">Your products</a>
                  </li>

                  <li>
                    <Link to="/login" onClick={logOutUser}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
