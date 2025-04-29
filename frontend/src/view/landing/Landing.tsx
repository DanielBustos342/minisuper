import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Bienvenido al MiniSuper
      </Typography>
      <Button variant="contained" component={Link} to="/cart">
        Cobrar productos
      </Button>
    </Container>
  );
}
