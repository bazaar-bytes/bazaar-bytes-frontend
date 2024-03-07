import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const API_URL = "http://localhost:5005";

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);

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
              <Link to={`/products/edit/${productId}`}>
                <button className="btn btn-primary">Edit</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
