import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const myCookie = cookies.get("isLoggedIn");

const Navigation = () => {
  const postLogout = () => {
    axios
      .post("/api/auth/logout", { withCredentials: true })
      .then((res) => {
        window.location.href = "http://localhost:3000/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="main-header ">
      <div className="main-header__nav">
        <div className="main-header__item-list">
          <div className="main-header__item">
            <NavLink to="/" end>
              Shop
            </NavLink>
          </div>
          <div className="main-header__item">
            <NavLink to="products">Products</NavLink>
          </div>
          <div className="main-header__item">
            <NavLink to="cart">Cart</NavLink>
          </div>
          <div className="main-header__item">
            <NavLink to="orders">Orders</NavLink>
          </div>
          {myCookie === "true" && (
            <>
              <div className="main-header__item">
                <NavLink to="add-product">Add Product</NavLink>
              </div>
              <div className="main-header__item">
                <NavLink to="admin/products">Admin Products</NavLink>
              </div>
            </>
          )}
        </div>

        <div className="main-header__item-list">
          {myCookie === "true" ? (
            <div className="main-header__item">
              <a href="#" onClick={postLogout}>
                Logout
              </a>
            </div>
          ) : (
            <>
              <div className="main-header__item">
                <NavLink to="login">Login</NavLink>
              </div>
              <div className="main-header__item">
                <NavLink to="signup">SignUp</NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
