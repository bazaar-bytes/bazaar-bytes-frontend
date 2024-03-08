import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const ProductListPage = () => {
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {user && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome, {user.name}!
          </h2>
          <Link to="/products/add">
            <button className="btn btn-primary bg-indigo-600">
              Create Listing
            </button>
          </Link>
        </div>
      )}

      <div className="grid gap-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6">
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
