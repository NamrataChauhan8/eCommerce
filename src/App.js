import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/accounts/Login';
import Signup from './views/accounts/Signup';
import Navbar from './components/navbar/Navbar';
import Home from './views/home/Home';
import MyOrders from './components/orders/MyOrders'

function App() {
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
                <Home />
              </>
            }
          />
          <Route
            path="/myorders"
            element={
              <>
                <Navbar />
                <MyOrders />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
