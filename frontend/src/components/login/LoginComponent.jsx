import React from "react";
import "./LoginComponent.css";

const LoginComponent = () => {
  return (
    <div className="loginBackground">
      <div className="loginContentWrapper">
        <h2 className="headingh2">Login</h2>
        <form>
          <div className="inputWrapper">
            <input type="text" placeholder="username" />
          </div>
          <div className="inputWrapper">
            <input type="password" placeholder="password" />
          </div>
          <div className="otherOptionLogin">
            <div>

            <input type="checkbox" name="remember me" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="/#">forgot?</a>
          </div>
          <div className="inputWrapper">
            <input type="submit" value="LOGIN" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
