import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const defaultValues = {
  name: "",
  description: "",
  image: "",
  price: "",
};

const categories = [
  "TECH",
  "CLOTHES",
  "FURNITURE",
  "COLLECTIBLES",
  "BOOKS",
  "VEHICLES",
];

export const AddProductPage = () => {
  const [product, setProduct] = useState(defaultValues);
  const [waitingForImage, setWaitingForImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const requestBody = {
      ...product,
      createdBy: user._id,
      image: imageUrl || product.image,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/products`, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        const newProduct = response.data;

        navigate(`/products/details/${newProduct._id}`);
      })
      .catch((error) => console.log(error));
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

          <button className="btn btn-active mx-auto" disabled={waitingForImage}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
