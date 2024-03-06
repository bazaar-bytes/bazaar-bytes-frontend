import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "tech",
    "clothes",
    "furniture",
    "collectibles",
    "books",
    "vehicles",
  ];

  const API_URL = "http://localhost:5005/api";

  useEffect(() => {
    axios.get(`${API_URL}/products/${productId}`).then((response) => {
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setImage(response.data.image);
      setCategory(response.data.category);
    });
  }, []);

  const handleEditSubmit = (e) => {
    const token = localStorage.getItem("authToken");

    e.preventDefault();
    axios
      .put(
        `${API_URL}/products/${productId}`,
        {
          name,
          description,
          price,
          image,
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form action="" onSubmit={handleEditSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          Name:
          <input
            type="text"
            className="grow"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Description:
          <input
            type="text"
            className="grow"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Price:
          <input
            type="text"
            className="grow"
            placeholder=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Image:
          <input
            type="text"
            className="grow"
            placeholder=""
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        {/* <select className="select w-full max-w-xs">
          <option>Category</option>
          {category?.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select> */}
        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>
            Category
          </option>
          {categories.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select>

        <button>Edit</button>
      </form>
    </>
  );
};
