import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/edit-product/${params.productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [params.productId]);

  const postEditProduct = (e) => {
    e.preventDefault();
    const updateProduct = {
      productId: e.target.productId.value,
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
      description: e.target.description.value,
      price: e.target.price.value,
    };

    axios
      .post("http://localhost:5000/admin/edit-product", updateProduct, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        alert("Edit product success!");
        window.location.href = "http://localhost:3000/admin/products";
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <form className="product-form" type="submit" onSubmit={postEditProduct}>
        <div className="form-control">
          <label for="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={product.title}
          />
        </div>
        <div className="form-control">
          <label for="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            defaultValue={product.imageUrl}
          />
        </div>
        <div className="form-control">
          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            defaultValue={product.price}
          />
        </div>
        <div className="form-control">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            defaultValue={product.description}
          ></textarea>
        </div>
        <input
          type="hidden"
          name="productId"
          id="productId"
          value={product.id}
        />
        <button className="btn" type="submit">
          Edit Product
        </button>
      </form>
    </main>
  );
}

export default EditProduct;
