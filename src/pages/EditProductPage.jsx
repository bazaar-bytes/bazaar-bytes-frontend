import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteModal } from "../components/DeleteModal";
import { WarningAlert } from "../components/WarningAlert";

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
  const [waitingForImage, setWaitingForImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const categories = [
    "tech",
    "clothes",
    "furniture",
    "collectibles",
    "books",
    "vehicles",
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`)
      .then((response) => {
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
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
        {
          name,
          description,
          price,
          image: imageUrl || image,
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        navigate("/my-dashboard");
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
      .delete(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate(`/my-dashboard`))
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        if (errorMessage && errorMessage.length > 1) {
          setWarningShown(true);
        }
      });
  };

  function handleFileUpload(e) {
    setWaitingForImage(true);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/upload`;

    const dataToUpload = new FormData();
    dataToUpload.append("file", e.target.files[0]);
    dataToUpload.append(
      "upload_preset",
      import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
    );

    axios
      .post(url, dataToUpload)
      .then((response) => {
        setImageUrl(response.data.secure_url);
        setWaitingForImage(false);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold">
        Here you can edit details about your product
      </h1>
      <form
        action=""
        onSubmit={handleEditSubmit}
        className="flex flex-col gap-4 "
      >
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow "
            placeholder={name}
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
        <div className="flex items-center">
          <input type="file" onChange={(e) => handleFileUpload(e)} />

          {imageUrl && (
            <img className="w-10" src={imageUrl} alt="my cloudinary image" />
          )}
        </div>
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
        <div className="flex gap-9 mx-auto">
          <button
            className="bg-indigo-600 rounded-[4px] text-white px-[15px]"
            disabled={waitingForImage}
          >
            Edit
          </button>
          <DeleteModal deleteProduct={handleDelete} />
        </div>

        {warningShown && (
          <WarningAlert
            errorMessage={errorMessage}
            closeAlert={() => setWarningShown(false)}
          />
        )}
      </form>
    </div>
  );
};
