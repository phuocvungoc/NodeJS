import React, { Component } from "react";
import axios from "axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/shop/orders")
      .then((res) => {
        const orders = res.data;
        this.setState({ orders });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.orders.length > 0) {
      const listOrder = this.state.orders.map((order) => {
        return (
          <div key={order._id}>
            <h1>Order- #{order._id}</h1>
            {order.products.map((item) => {
              return (
                <h2 key={item._id}>
                  {item.product.title}({item.quantity})
                </h2>
              );
            })}
          </div>
        );
      });

      return (
        <main className="centered">
          <div>{listOrder}</div>
        </main>
      );
    } else {
      return (
        <div>
          <h2>Nothing three!</h2>
        </div>
      );
    }
  }
}

export default Orders;
