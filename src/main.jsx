import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { ProductsProviderWrapper } from "./context/products.context.jsx";
import { CartProviderWrapper } from "./context/cart.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProviderWrapper>
      <ProductsProviderWrapper>
        <CartProviderWrapper>
          <App />
        </CartProviderWrapper>
      </ProductsProviderWrapper>
    </AuthProviderWrapper>
  </BrowserRouter>
);
