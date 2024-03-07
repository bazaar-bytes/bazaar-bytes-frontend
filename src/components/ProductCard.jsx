import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { _id, name, image, price } = product;
  const navigate = useNavigate();

  const API_URL = `http://localhost:5005`;

  const handleBuyClick = () => {
    const token = localStorage.getItem("auth");
    axios
      .post(`${API_URL}/api/orders`, product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        navigate("/buy");
      })
      .catch((error) => {
        console.error(error);
      });
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
      </div>
    </Link>
  );
};
