import Main from "./components/Main";
import Navigation from "./components/Navigation";
import AddProduct from "./components/AddProduct";
import AdminProducts from "./components/AdminProducts";
import EditProduct from "./components/EditProduct";
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
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/admin/products" element={<AdminProducts />} />
        <Route
          path="/admin/edit-product/:productId"
          element={<EditProduct />}
        />
      </Routes>
    </div>
  );
}

export default App;
