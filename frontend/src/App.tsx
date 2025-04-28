import FunctionAdd from "./components/functionAdd/FunctionAdd";
// import FunctionDelete from "./components/functionDelete/FunctionDelete";
// import FunctionProductsList from "./components/functionProductsList/FunctionProductsList";
// import FuntionScan from "./components/funtionScan/FunctionScan";
import Home from "./view/home/Home";
import Product from "./types/Product";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import FunctionScan from "./components/funtionScan/FunctionScan";

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
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<FunctionScan />} />
          <Route
            path="/products/add"
            element={<FunctionAdd onAddProduct={handleAddProduct} />}
          />
          {/* <Route
            path="/products"
            element={<FunctionProductsList onAddProduct={handleAddProduct} />}
          /> */}
          {/* <FuntionScan />
          <FunctionDelete />
          <FunctionAdd onAddProduct={handleAddProduct} />
          <FunctionProductsList
           products={products}
          handleDeleteProduct={handleDeleteProduct}
           /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
