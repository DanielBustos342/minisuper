import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// import { Link } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";

function ProductNavbar() {
  return (
    <AppBar position="static" sx={{ marginBottom: "50px" }}>
      <Container maxWidth="xl">
        {/* <Navbar /> */}
        <Toolbar disableGutters>
          <Navbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ProductNavbar;
