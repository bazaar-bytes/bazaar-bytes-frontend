import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteModal } from "../components/DeleteModal";
import { WarningAlert } from "../components/WarningAlert";
import { API_URL } from "./ProductListPage";

export const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [warningShown, setWarningShown] = useState(false);

  const categories = [
    "tech",
    "clothes",
    "furniture",
    "collectibles",
    "books",
    "vehicles",
  ];

  useEffect(() => {
    axios.get(`${API_URL}/products/${productId}`).then((response) => {
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setImage(response.data.image);
      setCategory(response.data.category);
    });
  }, [productId]);

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
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.response.data.message);
        if (errorMessage && errorMessage.length > 1) {
          setWarningShown(true);
        }
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate(`/`))
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        if (errorMessage && errorMessage.length > 1) {
          setWarningShown(true);
        }
      });
  };

  console.log(errorMessage);

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
        <select className="select select-primary w-full max-w-xs">
          <option disabled selected>
            Category
          </option>
          {categories.map((element) => {
            return (
              <option key={element.id} value={element}>
                {element}
              </option>
            );
          })}
        </select>

        <button>Edit</button>
        <DeleteModal deleteProduct={handleDelete} />
        {warningShown && (
          <WarningAlert
            errorMessage={errorMessage}
            closeAlert={() => setWarningShown(false)}
          />
        )}
      </form>
    </>
  );
};
