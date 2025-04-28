import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productController";

const ProductsRouter: Router = Router();

ProductsRouter.get("/", getProducts);
ProductsRouter.post("/add", addProduct);

export default ProductsRouter;
