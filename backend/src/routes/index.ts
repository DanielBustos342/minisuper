import { Router } from "express";
import productsRouter from "./productsRouter";
import purchaseRouter from "./purchaseRouter";

const router: Router = Router();

router.use("/products", productsRouter);
router.use("/purchases", purchaseRouter);

export default router;
