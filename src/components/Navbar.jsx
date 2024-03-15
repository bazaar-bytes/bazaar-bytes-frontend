import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { SearchBar } from "./SearchBar";
import { CartContext } from "../context/cart.context";
import { calculateSubtotal } from "../utils/calculateSubtotal";

export const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { pathname } = useLocation();

  const showSearch = pathname === "/" || pathname === "/my-dashboard";

  return (
    <div className=" bg-indigo-600 text-primary-content ">
      <div className="flex justify-between h-20 items-center px-4 gap-3">
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-secondary">
            BazaarBytes
          </h1>
        </Link>

        <div className=" flex justify-end mr-4 gap-5 items-center w-full ">
          {showSearch && <SearchBar />}

          {!isLoggedIn && (
            <div className="flex gap-3 ">
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
            <div className="flex items-center gap-4">
              <div className="flex-none ">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button">
                    <div className="indicator mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {cartItems && (
                        <span className="badge badge-sm indicator-item">
                          {cartItems.reduce((total, current) => {
                            return total + current.quantity;
                          }, 0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      <span className="font-bold text-lg">
                        {cartItems &&
                          cartItems.reduce((total, current) => {
                            return total + current.quantity;
                          }, 0)}{" "}
                        Items
                      </span>
                      <span className="text-info">
                        Subtotal: €{calculateSubtotal(cartItems).toFixed(2)}
                      </span>
                      <div className="card-actions">
                        <Link to="/cart" className="btn btn-primary btn-block">
                          View cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
