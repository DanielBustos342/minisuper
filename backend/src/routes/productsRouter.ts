import { Router } from "express";
import {
  getProducts,
  addProduct,
  // deleteProduct,
} from "../controllers/productController";

const ProductsRouter: Router = Router();

ProductsRouter.get("/", getProducts);
ProductsRouter.post("/add", addProduct);
// ProductsRouter.delete("/:id", deleteProduct);

export default ProductsRouter;
