import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/products.context";
import { API_URL } from "../pages/ProductListPage";
import { useDebounce } from "use-debounce";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000, { leading: false });
  const { setProducts } = useContext(ProductsContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/search?q=${debouncedQuery}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => {
        console.log("Error getting products from the API...");
        console.error(e);
      });
  }, [setProducts, debouncedQuery]);

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto h-10 rounded-full text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
