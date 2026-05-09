import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useCart } from "./hooks/useCart";
import type { Product } from "./types";

export default function App() {
  const {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`تمت إضافة "${product.name}" إلى السلة`, {
      duration: 2000,
    });
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home onAddToCart={handleAddToCart} cartCount={totalItems} />}
        />
        <Route
          path="/shop"
          element={<Shop onAddToCart={handleAddToCart} cartCount={totalItems} />}
        />
        <Route
          path="/shop/:id"
          element={
            <ProductDetail onAddToCart={handleAddToCart} cartCount={totalItems} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              items={cartItems}
              cartCount={totalItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              totalPrice={totalPrice}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              items={cartItems}
              cartCount={totalItems}
              totalPrice={totalPrice}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/about"
          element={<About cartCount={totalItems} />}
        />
        <Route
          path="/contact"
          element={<Contact cartCount={totalItems} />}
        />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-left" />
    </>
  );
}
