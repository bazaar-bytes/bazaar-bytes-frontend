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
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { Dashboard } from "./pages/Dashboard";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Footer } from "./components/Footer";
import { About } from "./pages/About";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-y-auto scroll-my-0 p-12 h-full">
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
          <Route
            path="/products/details/:productId/buy"
            element={
              <IsPrivate>
                <ShoppingCartPage />
              </IsPrivate>
            }
          />
          <Route
            path="/payment/success"
            element={
              <IsPrivate>
                <PaymentSuccess />
              </IsPrivate>
            }
          />
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
          <Route
            path="/my-dashboard"
            element={
              <IsPrivate>
                <Dashboard />
              </IsPrivate>
            }
          />
          <Route
            path="/cart"
            element={
              <IsPrivate>
                <ShoppingCartPage />
              </IsPrivate>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
