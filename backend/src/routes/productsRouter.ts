import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productController";

const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.post("/add", addProduct);

export default ProductRouter;
