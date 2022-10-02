import React, { Component } from "react";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/admin/products")
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(e) {
    e.preventDefault();
    let productId = e.target.productId.value;
    axios
      .post("http://localhost:5000/cart", { productId: productId })
      .then((res) => {
        alert("Add to cart successfully!");
        window.location.href = "http://localhost:3000/cart";
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  render() {
    const productsList = this.state.products.map((product) => {
      return (
        <article className="card product-item" key={product._id}>
          <header className="card__header">
            <h1 className="product__title">{product.title}</h1>
          </header>
          <div className="card__image">
            <img src={product.imageUrl} alt={product.title} />
          </div>
          <div className="card__content">
            <h2 className="product__price">{product.price}$</h2>
            <p className="product__description">{product.description}</p>
          </div>
          <div className="card__actions">
            <a href={`/detail/${product._id}`} className="btn">
              Details
            </a>
            <form
              type="submit"
              onSubmit={this.addToCart}
              className="form_add_cart"
            >
              <button className="btn" type="submit">
                Add to Cart
              </button>
              <input
                type="hidden"
                name="productId"
                id="productId"
                value={product._id}
              />
            </form>
          </div>
        </article>
      );
    });
    return <div className="grid">{productsList}</div>;
  }
}

export default Main;
