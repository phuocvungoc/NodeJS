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
      .get("/api/admin/products")
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteAdminProduct(e) {
    e.preventDefault();
    const prodId = e.target.productId.value;
    axios
      .post(
        "/api/admin/delete-product",
        { prodId: prodId },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        alert("Delete product success!");
        window.location.href = "http://localhost:3000/";
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
            <a href={"/admin/edit-product/" + product._id} className="btn">
              Edit
            </a>
            <form
              className="form_add_cart"
              type="submit"
              onSubmit={this.deleteAdminProduct}
            >
              <input
                type="hidden"
                value={product._id}
                name="productId"
                id="productId"
              />
              <button className="btn" type="submit">
                Delete
              </button>
            </form>
          </div>
        </article>
      );
    });
    return <div className="grid">{productsList}</div>;
  }
}

export default AdminProducts;
