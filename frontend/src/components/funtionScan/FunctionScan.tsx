import { useEffect, useState, useRef } from "react";
import Product from "../../types/Product";
import PurchaseTicket from "../PurchaseTicket/PurchaseTicket";
import axios from "axios";
import {
  Button,
  Container,
  Input,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";

export default function FunctionScan() {
  const [scannedCode, setScannedCode] = useState("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    []
  );
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
    setScannedCode(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = scannedCode.trim();
      if (value.length >= 2) {
        const product = products.find((p) => p.code === value);
        if (product) {
          const existingIndex = cart.findIndex(
            (item) => item.product.code === value
          );

          if (existingIndex !== -1) {
            const newCart = [...cart];
            newCart[existingIndex].quantity += 1;
            setCart(newCart);
          } else {
            setCart((prev) => [...prev, { product, quantity: 1 }]);
          }

          setErrorMessage("");
        } else {
          setErrorMessage("Producto no encontrado");
          setTimeout(() => setErrorMessage(""), 2000);
        }
        setScannedCode("");
      }
    }
  };

  const handleReset = () => {
    setCart([]);
    setShowTicket(false);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleFinishPurchase = async () => {
    try {
      const purchaseData = {
        items: cart.map((item) => ({
          productId: item.product.code,
          quantity: item.quantity,
        })),
        total,
      };

      await axios.post("http://localhost:3001/purchases", purchaseData);

      setShowTicket(true); // mostrar el ticket solo si se guardó correctamente
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      alert("No se pudo guardar la compra");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "60vw",
        mt: -4,
        p: 4,
        border: "2px solid blue",
        background: "lightgray",
        borderRadius: "20px",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Mini Mercado
      </Typography>

      <Input
        sx={{ m: 1, p: 1, width: "300px" }}
        ref={inputRef}
        type="text"
        value={scannedCode}
        onChange={handleScan}
        onKeyDown={handleKeyDown}
        placeholder="Escaneá un producto..."
      />

      <Typography
        sx={{
          m: 1,
          p: 2,
          width: "300px",
          backgroundColor: "green",
          color: "white",
          borderRadius: "10px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Total: ${total.toFixed(2)}
      </Typography>

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ mb: 4, width: "100%" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Producto</strong>
              </TableCell>
              <TableCell>
                <strong>Precio</strong>
              </TableCell>
              <TableCell>
                <strong>Cantidad</strong>
              </TableCell>
              <TableCell>
                <strong>Subtotal</strong>
              </TableCell>
              <TableCell>
                <strong>Acción</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>${item.product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    inputProps={{ min: 1 }}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, Math.max(1, +e.target.value))
                    }
                    size="small"
                    sx={{ width: "70px" }}
                  />
                </TableCell>
                <TableCell>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      const newCart = [...cart];
                      newCart.splice(index, 1);
                      setCart(newCart);
                    }}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={handleFinishPurchase}
        variant="contained"
        color="success"
        sx={{ px: 4, py: 1, mt: 2, borderRadius: "10px" }}
      >
        Finalizar compra
      </Button>

      <Dialog
        open={showTicket}
        onClose={() => setShowTicket(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers>
          <PurchaseTicket cart={cart} total={total} onReset={handleReset} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
