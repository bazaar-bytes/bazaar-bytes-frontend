import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { name, image, description } = product;
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
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="play-station" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button onClick={handleBuyClick} className="btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
