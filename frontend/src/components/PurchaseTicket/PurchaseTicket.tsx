import Product from "../../types/Product";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

type CartItem = {
  product: Product;
  quantity: number;
};

type Props = {
  cart: CartItem[];
  total: number;
  onReset: () => void;
};

export default function PurchaseTicket({ cart, total, onReset }: Props) {
  return (
    <Box
      sx={{
        mt: 2,
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🧾 Ticket de Compra
      </Typography>

      <List>
        {cart.map((item, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText primary={`${item.product.name} x${item.quantity}`} />
            <Typography>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" align="right">
        Total: ${total.toFixed(2)}
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={1}>
        {new Date().toLocaleString()}
      </Typography>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={onReset}>
          Nueva compra
        </Button>
      </Box>
    </Box>
  );
}
