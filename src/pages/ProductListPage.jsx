import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ProductsContext } from "../context/products.context";

export const ProductListPage = () => {
  const { user } = useContext(AuthContext);

  const { pathname } = useLocation();

  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products:", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {user && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-400">
            Welcome, {user.name}!
          </h2>
          <Link to="/products/add">
            <button className="btn btn-primary bg-indigo-600 dark:border-none">
              Sell a product
            </button>
          </Link>
        </div>
      )}

      <div>
        {products === null ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <div className="flex flex-col gap-8">
            <h1 className="text-center font-bold text-2xl">Explore products</h1>

            <div className="grid gap-3 gap-y-8 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6">
              {products
                .filter((product) => product.createdBy?._id !== user?._id)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isPublic={pathname === "/"}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
