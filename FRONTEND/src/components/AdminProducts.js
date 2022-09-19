import React, { Component } from "react";
import axios from "axios";

class AdminProducts extends Component {
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

  // adminEditProduct(e) {
  //   e.preventDefault();
  //   let productId = e.target.productId.value;
  //   axios
  //     .post("http://localhost:5000/admin/", { productId: productId })
  //     .then((res) => {
  //       alert("Add to cart successfully!");
  //       window.location.href = "http://localhost:3000/";
  //       return res.data;
  //     })
  //     .catch((err) => console.log(err));
  // }

  render() {
    const productsList = this.state.products.map((product) => {
      return (
        <article class="card product-item" key={product.id}>
          <header class="card__header">
            <h1 class="product__title"></h1>
          </header>
          <div class="card__image">
            <img src={product.imageUrl} alt={product.title} />
          </div>
          <div class="card__content">
            <h2 class="product__price">{product.price}$</h2>
            <p class="product__description">{product.description}</p>
          </div>
          <div class="card__actions">
            <a href={"/admin/edit-product/" + product.id} class="btn">
              Edit
            </a>
            <form
              action="/admin/delete-product"
              method="POST"
              className="form_add_cart"
            >
              <input type="hidden" value="<%= product.id %>" name="productId" />
              <button class="btn" type="submit">
                Delete
              </button>
            </form>
          </div>
        </article>
      );
    });
    return <div class="grid">{productsList}</div>;
  }
}

export default AdminProducts;
