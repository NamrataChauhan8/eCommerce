import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/accounts/Login";
import Signup from "./views/accounts/Signup";
import Navbar from "./components/navbar/Navbar";
import Home from "./views/home/Home";
import MyOrders from "./views/orders/MyOrders";
import Checkout from "./views/orders/Checkout";

function App() {
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, product]));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("Item removed successfully")
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
                <Navbar />
                <Home addToCart={addToCart} cartItems={cartItems} />
              </>
            }
          />
          <Route
            path="/myorders"
            element={
              <>
                <Navbar />
                <MyOrders
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Navbar />
                <Checkout />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
