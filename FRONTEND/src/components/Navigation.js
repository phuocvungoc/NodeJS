import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
            <div className="main-header__item">
              <NavLink to="add-product">Add Product</NavLink>
            </div>
            <div className="main-header__item">
              <NavLink to="admin/products">Admin Products</NavLink>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
