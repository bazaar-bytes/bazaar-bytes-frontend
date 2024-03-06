import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = "http://localhost:5005";

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  console.log(product);

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
        <div className="card lg:card-side bg-base-100 border border-red-500">
          <figure>
            <img src={product.image} alt={product.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
