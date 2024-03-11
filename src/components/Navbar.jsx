import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { SearchBar } from "./SearchBar";

export const Navbar = ({ query, setQuery }) => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className=" bg-indigo-600 text-primary-content">
      <div className="flex justify-between h-20 items-center px-4">
        <Link to="/">
          <h1 className="text-2xl">BazaarBytes</h1>
        </Link>

        <div className="w-1/4 flex justify-end mr-4 gap-6 items-center ">
          <SearchBar query={query} setQuery={setQuery} />
          {!isLoggedIn && (
            <div className="flex gap-6">
              <Link
                to="/login"
                className="text-nowrap text-sm font-bold hover:opacity-60"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-nowrap text-sm font-bold hover:opacity-60"
              >
                Sign Up
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
                    <Link to="/my-dashboard" className="justify-between ">
                      My products
                    </Link>
                  </li>

                  <li>
                    <Link to="/" onClick={logOutUser}>
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
