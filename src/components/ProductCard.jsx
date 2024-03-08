import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const ProductCard = ({ product }) => {
  const { _id, name, image, price } = product;
  const productId = product._id;

  const { user } = useContext(AuthContext);

  const API_URL = "http://localhost:5005";

  const handleBuyClick = () => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${API_URL}/api/cart`,
        { product: productId, user: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {})
      .catch((error) => console.error(error));
  };

  return (
    <Link to={`/products/details/${_id}`} className="mx-auto">
      <div className="card w-full h-full bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={name} className="object-cover w-80 h-72" />
        </figure>
        <div className="card-body text-left">
          <h2 className="card-title">{name}</h2>
          <p>{price}</p>
        </div>
        <Link to={`/products/details/${_id}/buy`}>
          <button onClick={handleBuyClick}>Buy</button>
        </Link>
      </div>
    </Link>
  );
};
