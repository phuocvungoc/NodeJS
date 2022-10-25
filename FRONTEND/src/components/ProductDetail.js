import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`/api/shop/detail/${params.productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [params.productId]);

  const addToCart = (e) => {
    e.preventDefault();
    let productId = e.target.productId.value;
    axios
      .post("/api/shop/cart", { productId: productId })
      .then((res) => {
        alert("Add to cart successfully!");
        window.location.href = "http://localhost:3000/";
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="center">
      <div>
        <img
          src={product.imageUrl}
          alt={product.title}
          width="300px"
          height="350px"
        />
      </div>
      <h2> {product.price} </h2>
      <p> {product.description}</p>
      <form type="submit" onSubmit={addToCart} className="form_add_cart">
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
    </main>
  );
}

export default Detail;
