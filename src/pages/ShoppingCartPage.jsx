import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "./ProductListPage";

export const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState();
  const token = localStorage.getItem("authToken");

  const shipping = 20;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.length);
        setCartItems(response.data.map((item) => ({ ...item, quantity: 1 })));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDecrementClick = (index) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      if (updatedCartItems[index].quantity >= 1) {
        updatedCartItems[index].quantity -= 1;
      }
      return updatedCartItems;
    });
  };

  const handleIncrementClick = (index) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      console.log("item", updatedCartItems[index]);
      updatedCartItems[index].quantity += 1;
      return updatedCartItems;
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
    const subtotal = calculateSubtotal();

    return subtotal > 0 ? subtotal + shipping : subtotal;
  };

  const handleDeleteClick = (item) => {
    axios
      .delete(`${API_URL}/api/cart/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        axios
          .get(`${API_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setCartItems(
              response.data.map((item) => ({ ...item, quantity: 1 }))
            );
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleCheckoutClick = () => {
    axios
      .post(`${API_URL}/api/create-checkout-session`, cartItems, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.location = response.data.url;
        return axios.delete(`${API_URL}/api/cart`, {
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
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl text-center">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">
            {cartItems && cartItems.length} Items
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-center font-semibold">Product</th>
                    <th className="text-center font-semibold">Price</th>
                    <th className="text-center font-semibold">Quantity</th>
                    <th className="text-center font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td className="py-4 border-t-4 ">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={item.product.image}
                                alt="Product image"
                              />
                              <span className="font-semibold">
                                {item.product.name}
                              </span>
                              <span className="mx-4">
                                {" "}
                                <button onClick={() => handleDeleteClick(item)}>
                                  delete
                                </button>
                              </span>
                            </div>
                          </td>
                          <td className="py-4">${item.product.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleDecrementClick(index)}
                                className="border rounded-md py-2 px-4 mr-2"
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrementClick(index)}
                                className="border rounded-md py-2 px-4 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ${item.quantity * item.product.price}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
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
