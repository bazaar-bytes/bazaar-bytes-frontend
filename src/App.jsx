import "./App.css";
import { AddProductPage } from "./pages/AddProductPage";
import { ProductListPage } from "./pages/ProductListPage";
import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { Navbar } from "./components/Navbar";
import { EditProductPage } from "./pages/EditProductPage";
import { IsPrivate } from "./components/IsPrivate";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-10">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/products/add"
            element={
              <IsPrivate>
                <AddProductPage />
              </IsPrivate>
            }
          />
          <Route path="/products/details/:productId/buy" />
          <Route
            path="/products/details/:productId"
            element={<ProductDetailsPage />}
          />

          <Route
            path="/products/edit/:productId"
            element={
              <IsPrivate>
                <EditProductPage />
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
