import { useEffect, useState, useRef } from "react";
import Product from "../../types/Product";
import PurchaseTicket from "../PurchaseTicket/PurchaseTicket";
import axios from "axios";

export default function FunctionScan() {
  const [scannedCode, setScannedCode] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>("http://localhost:3001/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error al traer productos:", error);
      alert("No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    fetchProducts();
    inputRef.current?.focus();
  }, []);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setScannedCode(value); // Solo guarda el código
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = scannedCode.trim();
      if (value.length >= 2) {
        const product = products.find((p) => p.code === value);
        if (product) {
          setCart((prev) => [...prev, product]);
          setErrorMessage(""); // Limpia errores si encuentra
        } else {
          setErrorMessage("Producto no encontrado"); // 👈 Seteamos el error
          setTimeout(() => setErrorMessage(""), 2000); // Después de 2 segundos se borra
        }
        setScannedCode(""); // Limpia el input
      }
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mini Mercado</h1>

      <input
        ref={inputRef}
        type="text"
        value={scannedCode}
        onChange={handleScan}
        onKeyDown={handleKeyDown}
        className="border p-2 w-full mb-2"
        placeholder="Escaneá un producto..."
      />

      {errorMessage && (
        <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
      )}

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Acción</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">${item.price}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => {
                      const newCart = [...cart];
                      newCart.splice(index, 1);
                      setCart(newCart);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showTicket ? (
        <button
          onClick={() => setShowTicket(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Finalizar compra
        </button>
      ) : (
        <PurchaseTicket
          cart={cart}
          total={total}
          onReset={() => {
            setCart([]);
            setShowTicket(false);
          }}
        />
      )}

      <div className="text-right font-bold text-lg mt-2">Total: ${total}</div>
    </div>
  );
}
