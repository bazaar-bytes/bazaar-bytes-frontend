import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

export const ProductDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const { productId } = useParams();

  const { fetchCartItems } = useContext(CartContext);

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
      .then(() => {
        fetchCartItems();
      })
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
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="card md:flex-row  bg-base-100 rounded-none xl:w-2/3 mx-auto items-center gap-8">
          <figure className="aspect-square w-[300px] md:w-[700px] lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover"
            />
          </figure>
          <div className=" text-left flex flex-col gap-4">
            <h2 className="card-title ">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">€{product.price}</p>
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
