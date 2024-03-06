import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

const defaultValues = {
  name: "",
  description: "",
  image: "",
  price: "",
};

export const AddProductPage = () => {
  const [product, setProduct] = useState(defaultValues);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  console.log(product);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const requestBody = {
      ...product,
    };

    axios
      .post(`${API_URL}/api/products`, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        const newProduct = response.data;
        console.log(newProduct);

        navigate(`/products/details/${newProduct._id}`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Add product
        </h3>
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              onChange={handleChange}
              type="text"
              className="grow"
              placeholder="My cool product"
              value={product.name}
              name="name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <input
              type="text"
              className="grow"
              placeholder="This is a cool product"
              value={product.description}
              onChange={handleChange}
              name="description"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Image
            <input
              type="text"
              className="grow"
              placeholder="https://example.com"
              value={product.image}
              onChange={handleChange}
              name="image"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Price
            <input
              type="number"
              className="grow"
              placeholder={100}
              value={product.price}
              onChange={handleChange}
              name="price"
            />
          </label>
          <button className="btn btn-active mx-auto">Add Product</button>
        </div>
      </form>
    </div>
  );
};
