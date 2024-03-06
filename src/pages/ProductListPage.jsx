import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";

export const ProductListPage = () => {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <Link to="/products/add">
        <button className="btn btn-primary">Add New Product</button>
      </Link>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products === null ? (
          <h1>Loading...</h1>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
