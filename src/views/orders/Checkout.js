import React from "react";
import { NavLink } from "react-router-dom";

const Checkout = ({isLoggedIn,isSignedup}) => {

  return (
    <div>
      {!isSignedup ? (
        <div>
          <h1>Please Sign up first</h1>
          <NavLink className="btn btn-primary" to="/">
            Sign Up
          </NavLink>
        </div>
      ) : (
        !isLoggedIn && (
          <div>
            <h1>Please Login first</h1>
            <NavLink className="btn btn-primary" to="/login">
              Login
            </NavLink>
          </div>
        )
      )}
      {isSignedup && isLoggedIn && <p>Checkout succesfull</p>}
    </div>
  );
};

export default Checkout;
