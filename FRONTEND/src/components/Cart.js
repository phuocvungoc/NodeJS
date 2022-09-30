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

  postOrder() {
    axios
      .post("http://localhost:5000/create-order")
      .then((res) => {
        alert("Order success!");
        window.location.href = "http://localhost:3000/";
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  deleteCart(e) {
    e.preventDefault();
    const prodId = e.target.productId.value;
    axios
      .post(
        "http://localhost:5000/cart-delete-item",
        { prodId: prodId },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        alert("Delete product in cart success!");
        window.location.href = "http://localhost:3000/";
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.cart.length > 0) {
      const listCart = this.state.cart.map((cart) => {
        return (
          <div>
            <h2>
              {cart.title}({cart.cartItem.quantity})
            </h2>
            <form type="submit" onSubmit={this.deleteCart}>
              <input type="hidden" value={cart.id} name="productId" />
              <button className="btn" type="submit">
                Delete
              </button>
            </form>
          </div>
        );
      });
      return (
        <main className="centered">
          <div>{listCart}</div>
          <hr />
          <form type="submit" onSubmit={this.postOrder}>
            <button type="submit" className="btn">
              Order Now!
            </button>
          </form>
        </main>
      );
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
