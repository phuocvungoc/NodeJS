import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/products")
      .then((res) => {
        const products = res.data;
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteAdminProduct = (e) => {
    e.preventDefault();
    const prodId = e.target.productId.value;
    axios
      .delete(`/api/admin/product/${prodId}`)
      .then((res) => {
        alert("Delete product success!");
        setProducts(products.filter((product) => product._id !== prodId));
      })
      .catch((err) => console.log(err));
  };

  const productsList = products.map((product) => {
    return (
      <article className="card product-item" key={product._id}>
        <header className="card__header">
          <h1 className="product__title">{product.title}</h1>
        </header>
        <div className="card__image">
          <img
            src={product.imageUrl}
            alt={product.title}
            width="120px"
            height="300px"
          />
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
            onSubmit={deleteAdminProduct}
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
};

export default AdminProducts;
