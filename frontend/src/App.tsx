import FunctionAdd from "./components/functionAdd/FunctionAdd";
// import FunctionDelete from "./components/functionDelete/FunctionDelete";
// import FunctionProductsList from "./components/functionProductsList/FunctionProductsList";
// import FuntionScan from "./components/funtionScan/FunctionScan";
// import Home from "./view/home/Home";
import Product from "./types/Product";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import FunctionScan from "./components/funtionScan/FunctionScan";
import Landing from "./view/landing/Landing";
import Home from "./view/home/Home";
import ProductPage from "./components/productPage/ProductPage";
// import Navbar from "./components/nav/Navbar";
import ProductNavbar from "./view/productNavbar/ProductNavbar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  // const handleDeleteProduct = (code: string) => {
  //   setProducts(products.filter((p) => p.code !== code));
  // };

  return (
    <Router>
      <ProductNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<FunctionScan />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productPage" element={<ProductPage />} />
          <Route
            path="/products/add"
            element={<FunctionAdd onAddProduct={handleAddProduct} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
