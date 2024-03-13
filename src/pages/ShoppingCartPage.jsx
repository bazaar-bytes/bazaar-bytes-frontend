import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cart.context";
import { MobileCart } from "../components/MobileCart";

export const ShoppingCartPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const token = localStorage.getItem("authToken");

  const shipping = 20;

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      const uniqueItems = response.data.reduce((acc, item) => {
        const existingItem = acc.find(
          (accItem) => accItem.product._id === item?.product._id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      }, []);

      setCartItems(uniqueItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDecrementClick = (item) => {
    console.log("item: ", item);
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
    console.log(item.product);

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
    console.log("item to delete; ", item.product);
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/cart/${item.product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            fetchCartItems();
          })
          .catch((error) => console.error(error));
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

  console.log(cartItems);

  if (cartItems === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between border-b pb-4">
          <h1 className="font-semibold text-2xl text-center">Shopping Cart</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 hidden sm:block">
              <table className="w-full ">
                <thead className="">
                  <tr>
                    <th className="text-center font-semibold ">Product</th>
                    <th className="text-center font-semibold ">Price</th>
                    <th className="text-center font-semibold ">Quantity</th>
                    <th className="text-center font-semibold ">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((item) => {
                      return (
                        <tr key={item?._id}>
                          <td className="py-4 border-t-4 ">
                            <div className="flex justify-between items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={item?.product?.image}
                                alt="Product image"
                              />
                              <span className="font-semibold">
                                {item.product?.name}
                              </span>

                              <button
                                className=" mb-1"
                                onClick={() => handleDeleteClick(item)}
                              >
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
                          </td>
                          <td className="py-4">${item.product?.price}</td>
                          <td className="py-4">
                            <div
                              className="flex items-center justify-center 
                             w-max mx-auto"
                            >
                              <button
                                onClick={() => handleDecrementClick(item)}
                                className="border rounded-md py-2 px-4 mr-2"
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrementClick(item)}
                                className="border rounded-md py-2 px-4 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ${item.quantity * item.product?.price}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <MobileCart
              cartItems={cartItems}
              handleDecrementClick={handleDecrementClick}
              handleDeleteClick={handleDeleteClick}
              handleIncrementClick={handleIncrementClick}
            />
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateSubtotal(cartItems)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${calculateTotal()}</span>
              </div>

              {cartItems && cartItems.length > 0 && (
                <button
                  onClick={handleCheckoutClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  type="submit"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-left mx-12">
        <button onClick={() => navigate("/")}>Continue shopping</button>
      </div>
    </div>
  );
};
