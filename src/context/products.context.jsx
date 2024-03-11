import { createContext, useState } from "react";

const ProductsContext = createContext();

const ProductsProviderWrapper = ({ children }) => {
  const [products, setProducts] = useState(null);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProviderWrapper, ProductsContext };
