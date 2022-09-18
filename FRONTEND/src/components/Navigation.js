import React, { Component } from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header class="main-header">
        <nav class="main-header__nav">
          <ul class="main-header__item-list">
            <li class="main-header__item">
              <a class="<%= path === '/' ? 'active' : '' %>" href="/">
                Shop
              </a>
            </li>
            <li class="main-header__item">
              <a
                class="<%= path === '/products' ? 'active' : '' %>"
                href="/products"
              >
                Products
              </a>
            </li>
            <li class="main-header__item">
              <a class="<%= path === '/cart' ? 'active' : '' %>" href="/cart">
                Cart
              </a>
            </li>
            <li class="main-header__item">
              <a
                class="<%= path === '/orders' ? 'active' : '' %>"
                href="/orders"
              >
                Orders
              </a>
            </li>
            <li class="main-header__item">
              <a
                class="<%= path === '/admin/add-product' ? 'active' : '' %>"
                href="/add-product"
              >
                Add Product
              </a>
            </li>
            <li class="main-header__item">
              <a
                class="<%= path === '/admin/products' ? 'active' : '' %>"
                href="/admin/products"
              >
                Admin Products
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navigation;
