import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/products.context";
import { API_URL } from "../App";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  // const [searchResult, setSearchResult] = useState(null);
  const { setProducts } = useContext(ProductsContext);
  console.log(query);

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
      {/* {searchResult && searchResult.length > 0 && (
        <div className="bg-white">
          {searchResult.map((product) => (
            <div key={product._id}>{product.name}</div>
          ))}
        </div>
      )} */}
    </div>
  );
};
