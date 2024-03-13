import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const ProductDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const { productId } = useParams();

  const handleBuyClick = () => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        { product: productId, user: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setIsOwner(response.data.createdBy === user._id);
        })
        .catch((error) => console.log(error));
    }
  }, [user, productId]);

  return (
    <div>
      {product === null ? (
        <h1>Loading...</h1>
      ) : (
        <div className="card lg:card-side bg-base-100 rounded-none xl:w-2/3 mx-auto ">
          <figure className="h-80 sm:h-[550px] lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title ">{product.name}</h2>
            <p>{product.description}</p>
            <p>€{product.price}</p>
            <div className="card-actions ">
              {isOwner ? (
                <Link to={`/products/edit/${productId}`}>
                  <button className="btn btn-primary bg-indigo-600">
                    Edit
                  </button>
                </Link>
              ) : (
                <Link to={`/cart`}>
                  <button className="btn btn-primary" onClick={handleBuyClick}>
                    Buy
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
