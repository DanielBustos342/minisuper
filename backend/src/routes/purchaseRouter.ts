import { Router } from "express";
import { createPurchase } from "../controllers/purchaseController";

const PurchaseRouter = Router();

console.log(typeof createPurchase); // debería decir "function"

PurchaseRouter.post("/", createPurchase);

export default PurchaseRouter;
