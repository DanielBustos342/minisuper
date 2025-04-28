import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bienvenido al MiniSuper
      </Typography>
      <Button variant="contained" component={Link} to="/cart">
        Cobrar productos
      </Button>
    </div>
  );
}
