import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/Actions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/Account.scss";
import { LOGIN_SUCCESS } from "../../redux/action/ActionTypes";
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from "../../constants/Message";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      navigate("/home");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log("Submitting login form with email:", email);
    dispatch(login(email, password)).then(() => {
      if (LOGIN_SUCCESS) {
        console.log("Login successfull")
        navigate("/home");
      }else{
        return
      }
    });
  };

  return (
    <div className="form">
      <img
        src="https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg"
        alt="login"
        style={{ width: "100%", height: "100%", marginTop: 0 }}
      />
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            autoComplete="username"
          />
          {errors.email && <span className="error">{EMAIL_REQUIRED}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="error">{PASSWORD_REQUIRED}</span>
          )}
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;