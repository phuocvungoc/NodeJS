import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditProduct() {
  const [err, setErr] = useState("");
  const [product, setProduct] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`/api/admin/edit-product/${params.productId}`)
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
      .post("/api/admin/edit-product", updateProduct, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Edit product success!");
        window.location.href = "http://localhost:3000/admin/products";
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
      <form className="product-form" type="submit" onSubmit={postEditProduct}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={product.title}
          />
        </div>
        {/* <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            defaultValue={product.imageUrl}
          />
        </div> */}
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            defaultValue={product.price}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
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
          value={product._id}
        />
        <button className="btn" type="submit">
          Edit Product
        </button>
      </form>
    </main>
  );
}

export default EditProduct;
