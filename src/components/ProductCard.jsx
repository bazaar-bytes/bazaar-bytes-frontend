import { Link } from "react-router-dom";

export const ProductCard = ({ product, isPublic }) => {
  const { _id, name, image, price } = product;

  return (
    <Link to={`/products/details/${_id}`} className="mx-auto ">
      <div className="card w-full h-72 bg-base-100">
        <figure className="rounded-md shadow-md">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full aspect-square"
          />
        </figure>
        <div className="card-body text-left px-4 py-2 ">
          <h3 className="card-title text-sm leading-none text-gray-600">
            {name}
          </h3>
          <p className="text-sm font-bold leading-none">€{price}</p>
          {isPublic && (
            <p className="text-sm leading-none">
              Ad by {product.createdBy?.name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
