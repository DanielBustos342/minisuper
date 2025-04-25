import { useState } from "react";
import Product from "../../types/Product";
import axios from "axios";

interface Props {
  onAddProduct: (product: Product) => void;
}

export default function FunctionAdd({ onAddProduct }: Props) {
  const [newProduct, setNewProduct] = useState<Product>({
    code: "",
    name: "",
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleAddProduct = async () => {
    if (!newProduct.code || !newProduct.name || newProduct.price <= 0)
      return alert("Completa todos los campos correctamente");

    try {
      const res = await axios.post(
        "http://localhost:3001/products/add",
        newProduct
      );
      console.log("Producto agregado:", res.data);
      onAddProduct(res.data); // Actualiza la lista en el padre
      setNewProduct({ code: "", name: "", price: 0 });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("No se pudo agregar el producto");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Agregar Producto</h2>
      <input
        name="code"
        type="text"
        placeholder="Código de barras"
        value={newProduct.code}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="name"
        type="text"
        placeholder="Nombre del producto"
        value={newProduct.name}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={newProduct.price}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Producto
      </button>
    </>
  );
}
