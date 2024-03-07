import "./App.css";
import { ProductListPage } from "./pages/ProductListPage";
import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { EditProductPage } from "./pages/EditProductPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:productId" element={<EditProductPage />} />
        <Route path="/buy" element={<ShoppingCartPage />} />
      </Routes>
    </>
  );
}

export default App;
