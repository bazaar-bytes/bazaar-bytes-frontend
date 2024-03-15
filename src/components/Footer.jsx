import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className=" bg-indigo-600 text-primary-content py-4 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <p>
          <Link className="text-neutral hover:black" to="/about">
            <button className="btn btn-ghost text-white hover:bg-grey hover:text-bggrey btn-sm ml-5">
              {" "}
              About Us
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};
