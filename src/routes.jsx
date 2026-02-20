import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Chat from "./pages/Chat";
function AppRoutes() {
  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<MyProducts />} path="/myproduct" />
        <Route path="/edit/:id" element={<EditProduct />} />
<Route path="/chat" element={<Chat />} />

      </Routes>
    </div>
  );
}

export default AppRoutes;