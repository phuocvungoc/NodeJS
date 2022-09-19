import React, { Component } from "react";
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/cart")
      .then((res) => {
        const cart = res.data;
        this.setState({ cart });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.cart.length > 0) {
      const listCart = this.state.cart.map((cart) => {
        return (
          <div>
            <h2>
              {cart.productData.title}({cart.qty})
            </h2>
          </div>
        );
      });
      return <div>{listCart}</div>;
    } else {
      return (
        <div>
          <h2>No Product in Cart!</h2>
        </div>
      );
    }
  }
}

export default Cart;
