import React, { Component } from "react";

class AddProduct extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <form class="product-form" action="/admin/add-product" method="POST">
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
