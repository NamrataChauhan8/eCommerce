import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const MyOrders = ({ cartItems, removeFromCart,isLoggedIn,isSignedup }) => {
  const navigate = useNavigate();


  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mt-3">
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
      {isSignedup && isLoggedIn && (
        <div>
          <h2>My Orders</h2>
          {cartItems.length === 0 ? (
            <p>No items in your cart.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4">
              {cartItems.map((item, index) => (
                <div className="col mb-4" key={index}>
                  <div className="card h-100">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.title}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <b>{item.price}₹</b>
                      </p>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">
                        <b>Category:</b> {item.category}
                      </p>
                      <p className="card-text">
                        <b>Rating:</b> {item.rating.rate} ({item.rating.count}{" "}
                        reviews)
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                      <p>
                        <button
                          className="btn btn-info mt-3"
                          onClick={handleCheckOut}
                        >
                          Buy now
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
