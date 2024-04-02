import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = userData !== null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleOrders = () => {
    navigate("/myOrders");
  };

  const showHomeButton = location.pathname === "/myOrders";

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand">eCommerce</span>
        <form className="d-flex">
          {isLoggedIn && (
            <>
              {showHomeButton && (
                <button
                  className="btn btn-outline-info mx-3"
                  onClick={() => navigate("/home")}
                >
                  Home
                </button>
              )}
              {!showHomeButton && (
                <button
                  className="btn btn-outline-info ml-3"
                  onClick={handleOrders}
                >
                  My Orders
                </button>
              )}
              <button
                className="btn btn-outline-danger mx-3"
                onClick={handleLogout}
              >
                Logout
              </button>
              
            </>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
