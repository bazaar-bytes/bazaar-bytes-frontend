import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

export const ProductDetailsPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  const isOwner =
    product !== null &&
    user !== null &&
    product.createdBy.toString() === user._id.toString();

  console.log(isOwner);

  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  return (
    <div>
      {product === null ? (
        <h1>Loading...</h1>
      ) : (
        <div className="card lg:card-side bg-base-100   md:w-2/3 xl:w-1/2 mx-auto">
          <figure>
            <img src={product.image} alt={product.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
              {isOwner ? (
                <Link to={`/products/edit/${productId}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
              ) : (
                <Link>
                  <button className="btn btn-primary">Buy</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
