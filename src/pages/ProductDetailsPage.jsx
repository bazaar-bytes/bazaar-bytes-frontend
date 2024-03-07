import axios from "axios";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link, useParams } from "react-router-dom";
=======
import { useParams,useNavigate } from "react-router-dom";
>>>>>>> feat/shoppingCart
const API_URL = "http://localhost:5005";

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
<<<<<<< HEAD
=======
  console.log(product);
  const navigate = useNavigate();
>>>>>>> feat/shoppingCart

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
<<<<<<< HEAD
              <Link to={`/products/edit/${productId}`}>
                <button className="btn btn-primary">Edit</button>
              </Link>
=======
              <button onClick={} className="btn btn-primary">Edit</button>
              <button className="btn btn-primary">Delete</button>
>>>>>>> feat/shoppingCart
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
