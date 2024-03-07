// import React, { useState } from "react";

// const API_URL = "http://localhost:5005";

// const CartContext = React.createContext();

// function CartProviderWrapper(props) {
//   const [products, setProducts] = useState([]);

//   const addProductToCart = (product) => {
//     setProducts((prevItems) => [...prevItems, product]);
//     console.log(products);
//   };

//   return (
//     <CartContext.Provider value={{ addProductToCart, products }}>
//       {props.children}
//     </CartContext.Provider>
//   );
// }

// export { CartProviderWrapper, CartContext };
