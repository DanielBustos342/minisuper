import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../types/Product";
import FunctionAdd from "../functionAdd/FunctionAdd";
import FunctionProductsList from "../functionProductsList/FunctionProductsList";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleDeleteProduct = async (code: string) => {
    try {
      await axios.delete(`http://localhost:3001/products/${code}`);
      setProducts((prev) => prev.filter((p) => p.code !== code));
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <FunctionAdd onAddProduct={handleAddProduct} />
      <FunctionProductsList
        products={products}
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}
