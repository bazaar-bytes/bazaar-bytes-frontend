import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import {
  ProductsContext,
  ProductsProviderWrapper,
} from "./context/products.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsProviderWrapper>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </ProductsProviderWrapper>
  </BrowserRouter>
);
