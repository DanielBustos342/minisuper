import { useState } from "react";
import Product from "../../types/Product";

export default function FunctionDelete() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleDeleteProduct = (code: string) => {
    setProducts(products.filter((p) => p.code !== code));
  };
  return (
    <ul>
      {products.map((product, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-b py-1"
        >
          <span>
            {product.name} - ${product.price}
          </span>
          <button
            onClick={() => handleDeleteProduct(product.code)}
            className="text-red-500 hover:underline"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
