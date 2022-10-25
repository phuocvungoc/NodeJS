import Main from "./components/Main";
import Navigation from "./components/Navigation";
import AddProduct from "./components/AddProduct";
import AdminProducts from "./components/AdminProducts";
import EditProduct from "./components/EditProduct";
import Cart from "./components/Cart";
import Detail from "./components/ProductDetail";
import Orders from "./components/Orders";
import Login from "./page/login";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./CSS/forms.css";
import "./CSS/main.css";
import "./CSS/product.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/detail/:productId" element={<Detail />} />
        <Route exact path="/admin/products" element={<AdminProducts />} />
        <Route
          path="/admin/edit-product/:productId"
          element={<EditProduct />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
