import React, { Component } from "react";
import axios from "axios";

class AddProduct extends Component {
  constructor(props) {
    super(props);
  }

  postAddProduct(e) {
    e.preventDefault();
    const newProduct = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
      description: e.target.description.value,
      price: e.target.price.value,
    };
    axios
      .post("http://localhost:5000/admin/add-product", newProduct, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        alert("Add product success!");
        window.location.href = "http://localhost:3000/";
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <main>
        <form class="product-form" type="submit" onSubmit={this.postAddProduct}>
          <div class="form-control">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div class="form-control">
            <label for="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" />
          </div>
          <div class="form-control">
            <label for="price">Price</label>
            <input type="number" name="price" id="price" step="0.01" />
          </div>
          <div class="form-control">
            <label for="description">Description</label>
            <textarea name="description" id="description" rows="5"></textarea>
          </div>
          <input type="hidden" name="productId" />
          <button class="btn" type="submit">
            Add Product
          </button>
        </form>
      </main>
    );
  }
}

export default AddProduct;
