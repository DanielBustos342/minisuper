import Product from "../../types/Product";

interface Props {
  products: Product[];
  handleDeleteProduct: (code: string) => void;
}

export default function FunctionProductsList({
  products,
  handleDeleteProduct,
}: Props) {
  return (
    <>
      <h2 className="text-xl font-semibold mt-6 mb-2">Lista de Productos</h2>
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
    </>
  );
}
