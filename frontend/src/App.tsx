import FunctionAdd from "./components/functionAdd/FunctionAdd";
// import FunctionDelete from "./components/functionDelete/FunctionDelete";
import FunctionProductsList from "./components/functionProductsList/FunctionProductsList";
import FuntionScan from "./components/funtionScan/FunctionScan";
import Product from "./types/Product";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (code: string) => {
    setProducts(products.filter((p) => p.code !== code));
  };

  return (
    <>
      <FuntionScan />
      {/* <FunctionDelete /> */}
      <FunctionAdd onAddProduct={handleAddProduct} />
      <FunctionProductsList
        products={products}
        handleDeleteProduct={handleDeleteProduct}
      />
    </>
  );
}

export default App;
