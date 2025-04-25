import { useEffect, useState, useRef } from "react";
import productsDB from "../../types/ProductDB";
import Product from "../../types/Product";
import PurchaseTicket from "../PurchaseTicket/PurchaseTicket";

export default function FunctionScan() {
  const [scannedCode, setScannedCode] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTicket, setShowTicket] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [cart]);

  const handleScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value.length >= 13) {
      const product = productsDB.find((p) => p.code === value);
      if (product) {
        setCart((prev) => [...prev, product]);
      } else {
        alert("Producto no encontrado");
      }
      setScannedCode("");
    } else {
      setScannedCode(value);
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
        className="border p-2 w-full mb-4"
        placeholder="Escaneá un producto..."
      />

      <ul className="mb-4">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-1"
          >
            <div>
              <span>{item.name}</span> - <span>${item.price}</span>
            </div>
            <button
              onClick={() => {
                const newCart = [...cart];
                newCart.splice(index, 1);
                setCart(newCart);
              }}
              className="text-red-500 hover:underline ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
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
      <div className="text-right font-bold text-lg">Total: ${total}</div>
    </div>
  );
}
