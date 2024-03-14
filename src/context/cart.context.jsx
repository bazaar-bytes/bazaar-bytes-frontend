import { createContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProviderWrapper = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("products are fetched :", response.data);
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProviderWrapper, CartContext };
