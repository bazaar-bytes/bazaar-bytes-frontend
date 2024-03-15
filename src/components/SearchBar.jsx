import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/products.context";
import { useDebounce } from "use-debounce";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000, { leading: false });
  const { setProducts } = useContext(ProductsContext);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/products/search?q=${debouncedQuery}`
      )
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
        placeholder="Search for a product"
        className="sm:w-full input input-bordered md:w-auto h-10 rounded-full text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
