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
            <h1>
              Order- #{order._id} - {""}
              {/* <a href={`http://localhost:5000/api/shop/orders/${order._id}`}>
                Invoice
              </a> */}
              <button
                className="cssButton"
                onClick={(e) => {
                  fetch(`/api/shop/orders/${order._id}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(async (res) => {
                    if (res.status === 200) {
                      const blob = await res.blob();
                      const file = new Blob([blob], {
                        type: "application/pdf",
                      });
                      //Build a URL from the file
                      const fileURL = URL.createObjectURL(file);
                      //Open the URL on new Window
                      window.open(fileURL);
                    }
                  });
                }}
              >
                Invoice
              </button>
            </h1>
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
