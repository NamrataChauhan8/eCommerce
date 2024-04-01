import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = userData !== null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand">
          eCommerce
        </span>
        <form className="d-flex">
          {!isLoggedIn && (
            <>
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-link"
              >
                <button className="btn btn-outline-success mx-3">Login</button>
              </NavLink>
              <NavLink
                to="/signup"
                activeClassName="active"
                className="nav-link"
              >
                <button className="btn btn-outline-success mx-4 mr-5">
                  Register
                </button>
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <button
              className="btn btn-outline-danger mx-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
