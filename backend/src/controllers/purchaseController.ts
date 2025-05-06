import { Request, Response } from "express";
import Purchase from "../models/purchase";
import PurchaseItem from "../models/purchaseItem";

export const createPurchase = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || typeof total !== "number") {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const newPurchase = await Purchase.create({ total });

    for (const item of items) {
      await PurchaseItem.create({
        purchaseId: newPurchase.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    return res.status(201).json({ message: "Compra registrada con éxito" });
  } catch (error) {
    console.error("Error al registrar la compra:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
