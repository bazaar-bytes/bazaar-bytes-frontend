import { createContext, useState } from "react";

const CartContext = createContext();

const CartProviderWrapper = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProviderWrapper, CartContext };
