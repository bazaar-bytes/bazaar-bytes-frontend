import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cart.context";

export const ShoppingCartPage = () => {
  const { cartItems, fetchCartItems } = useContext(CartContext);

  const token = localStorage.getItem("authToken");

  const shipping = 20;

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDecrementClick = (item) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/cart/reduceQuantity/${item._id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => console.error(error));
  };

  const handleIncrementClick = (item) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        { product: item.product },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        fetchCartItems();
      });
  };

  const calculateSubtotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    if (!cartItems) return 0;
    const subtotal = calculateSubtotal(cartItems);

    const total = subtotal > 0 ? subtotal + shipping : subtotal;
    return total;
  };

  const handleDeleteClick = (item) => {
    axios

      .delete(`${import.meta.env.VITE_API_URL}/api/cart/${item.product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchCartItems();
      })

      .catch((error) => console.error(error));
  };

  const handleCheckoutClick = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/create-checkout-session`,
        cartItems,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        window.location = response.data.url;
        return axios.delete(`${import.meta.env.VITE_API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .catch((error) => console.error(error))
      .catch((error) => console.error(error));
  };

  if (cartItems === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-4 flex flex-col gap-8 px-4 dark:dark:bg-gray-700 dark:text-black">
      <div className="container max-w-full ">
        <div className="flex justify-between pb-4">
          <h1 className="font-semibold text-2xl text-center">Shopping Cart</h1>
        </div>
        <div className="flex flex-col min-[900px]:flex-row justify-between gap-8">
          <div className="min-[900px]:w-[70%]">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4  sm:block w-full dark:bg-gray-500">
              <div className="flex flex-col gap-10">
                {cartItems &&
                  cartItems.map((item) => {
                    return (
                      <div
                        key={item?._id}
                        className="flex flex-col gap-3 min-[550px]:flex-row min-[550px]:justify-between"
                      >
                        <div className="flex  items-center justify-between min-[550px]:gap-6 sm:gap-16 md:gap-24 min-[900px]:gap-16 lg:gap-24 xl:gap-32">
                          <img
                            className="h-20 w-20"
                            src={item?.product?.image}
                            alt="Product image"
                          />

                          <div className="flex flex-col items-start">
                            <h3>{item.product?.name}</h3>
                            <p className="font-bold">${item.product?.price}</p>
                          </div>
                          <button onClick={() => handleDeleteClick(item)}>
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
                        <div
                          className="flex items-center 
                             w-max"
                        >
                          <button
                            onClick={() => handleDecrementClick(item)}
                            className="border rounded-md py-2 px-4 mr-2 dark:border-black"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrementClick(item)}
                            className="border rounded-md py-2 px-4 ml-2 dark:border-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="min-[900px]:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-500">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${Math.round(calculateSubtotal(cartItems))}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <hr className="my-2 dark:border-black" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${Math.round(calculateTotal())}
                </span>
              </div>

              {cartItems && cartItems.length > 0 && (
                <button
                  onClick={handleCheckoutClick}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-max dark:text-gray-300"
                  type="submit"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-left">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 btn btn-primary dark:border-none"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
};
