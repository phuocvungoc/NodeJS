import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [err, setErr] = useState("");
  const postAddProduct = (e) => {
    e.preventDefault();
    console.log(e.target.image.files[0]);
    const newProduct = {
      title: e.target.title.value,
      image: e.target.image.files[0],
      description: e.target.description.value,
      price: e.target.price.value,
    };
    axios
      .post("/api/admin/add-product", newProduct, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Add product success!");
        window.location.href = "http://localhost:3000/";
        return res.data;
      })
      .catch((err) => {
        if (err.response.status == 422) {
          setErr(err.response.data);
        }
      });
  };

  return (
    <main>
      {err && <div className="user-message user-message--error">{err}</div>}
      <form className="product-form" type="submit" onSubmit={postAddProduct}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" step="0.01" />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows="5"></textarea>
        </div>
        <input type="hidden" name="productId" />
        <button className="btn" type="submit">
          Add Product
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
