import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

export const ProductListPage = () => {
  const API_URL = "http://localhost:5005";

  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then((response) => {
      console.log(response);
      setProducts(response.data);
    });
  }, []);
  console.log(products);
  return (
    <div>
      {products === null ? (
        <h1>Loading...</h1>
      ) : (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};
