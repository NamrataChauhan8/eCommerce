import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/accounts/Login";
import Signup from "./views/accounts/Signup";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/home/Home";
import MyOrders from "./views/orders/MyOrders";
import Checkout from "./views/orders/Checkout";
import Slider from "./views/slider/Slider";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const isLoggedIn = useSelector((state) => state.loginSignup.isLoggedIn);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isSignedup = userData !== null;

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("Item removed successfully");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <Navbar isLoggedIn={isLoggedIn} isSignedup={isSignedup} />
                <Slider />
                <Home
                  addToCart={addToCart}
                  cartItems={cartItems}
                  isLoggedIn={isLoggedIn}
                  isSignedup={isSignedup}
                />
              </>
            }
          />
          <Route
            path="/myorders"
            element={
              <>
                <Navbar isLoggedIn={isLoggedIn} isSignedup={isSignedup} />
                <MyOrders
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  isLoggedIn={isLoggedIn}
                  isSignedup={isSignedup}
                />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Navbar isLoggedIn={isLoggedIn} isSignedup={isSignedup} />
                <Checkout isLoggedIn={isLoggedIn} isSignedup={isSignedup} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
