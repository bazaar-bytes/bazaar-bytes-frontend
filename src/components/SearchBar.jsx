import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/products.context";
import { API_URL } from "../pages/ProductListPage";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { setProducts } = useContext(ProductsContext);

  useEffect(() => {
    console.log(query);
    axios
      .get(`${API_URL}/api/products/search?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((e) => {
        console.log("Error getting products from the API...");
        console.error(e);
      });
  }, [setProducts, query]);

  return (
    <div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto h-10 rounded-full text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
