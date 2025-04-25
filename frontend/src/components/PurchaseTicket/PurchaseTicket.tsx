import Product from "../../types/Product";

type Props = {
  cart: Product[];
  total: number;
  onReset: () => void;
};

export default function PurchaseTicket({ cart, total, onReset }: Props) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-bold mb-2">🧾 Ticket de Compra</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
      <div className="text-right font-bold mt-2">Total: ${total}</div>
      <div className="text-sm text-gray-600 mt-1">
        {new Date().toLocaleString()}
      </div>
      <button
        onClick={onReset}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Nueva compra
      </button>
    </div>
  );
}
