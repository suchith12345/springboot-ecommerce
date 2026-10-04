import "./App.css";
import Home from "./Components/home/Home";
import Product from "./Components/products/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/shared/Navbar";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./Components/cart/Cart";
import LogIn from "./Components/auth/LogIn";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Components/auth/Register";
import CheckOut from "./Components/checkout/CheckOut";
function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckOut />} />
          </Route>

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </React.Fragment>
  );
}

export default App;
