import FunctionAdd from "./components/functionAdd/FunctionAdd";
import Product from "./types/Product";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import FunctionScan from "./components/funtionScan/FunctionScan";
import Landing from "./view/landing/Landing";
import Home from "./view/home/Home";
import ProductPage from "./components/productPage/ProductPage";
import ProductNavbar from "./view/productNavbar/ProductNavbar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return (
    <>
      {location.pathname !== "/landing" && location.pathname !== "/" && (
        <ProductNavbar />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/cart" element={<FunctionScan />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route
          path="/products/add"
          element={<FunctionAdd onAddProduct={handleAddProduct} />}
        />
      </Routes>
    </>
  );
}

export default App;
