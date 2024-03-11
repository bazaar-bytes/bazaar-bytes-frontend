export const MobileCart = ({
  cartItems,
  handleDeleteClick,
  handleDecrementClick,
  handleIncrementClick,
}) => {
  return (
    <div className="sm:hidden bg-white rounded-lg shadow-md ">
      {cartItems &&
        cartItems.map((item, index) => {
          return (
            <div key={item?._id} className="min-[500px]:w-2/3 mx-auto">
              <div>
                <div className="flex justify-around pt-4">
                  <img
                    className="h-16 w-16 mr-4"
                    src={item.product?.image}
                    alt="Product image"
                  />
                  <div>
                    <span className="font-semibold">{item.product?.name}</span>
                    <div className="py-4">${item.product?.price}</div>
                  </div>
                </div>
              </div>
              <div className="py-4 flex justify-around">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrementClick(index)}
                    className="border rounded-md py-2 px-4 mr-2"
                  >
                    -
                  </button>
                  <span className="text-center w-8">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrementClick(index)}
                    className="border rounded-md py-2 px-4 ml-2"
                  >
                    +
                  </button>
                </div>
                <button className="" onClick={() => handleDeleteClick(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              {/* <td className="py-4">${item.quantity * item.product?.price}</td> */}
            </div>
          );
        })}
    </div>
  );
};
