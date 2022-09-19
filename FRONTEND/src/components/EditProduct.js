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
  return (
    <main>
      <form class="product-form" type="submit">
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" value={product.title} />
        </div>
        <div class="form-control">
          <label for="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={product.imageUrl}
          />
        </div>
        <div class="form-control">
          <label for="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            value={product.price}
          />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={product.description}
          ></textarea>
        </div>
        <input type="hidden" name="productId" />
        <button class="btn" type="submit">
          Edit Product
        </button>
      </form>
    </main>
  );
}

export default EditProduct;
