import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ProductsContext } from "../context/products.context";

export const API_URL = "http://localhost:5005";

export const ProductListPage = () => {
  const { user } = useContext(AuthContext);

  const { pathname } = useLocation();

  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then((response) => {
      setProducts(response.data);
    });
  }, [setProducts]);

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
            <ProductCard
              key={product._id}
              product={product}
              isPublic={pathname === "/"}
            />
          ))
        )}
      </div>
    </div>
  );
};
