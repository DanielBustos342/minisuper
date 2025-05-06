// models/purchaseItem.ts
import { DataTypes } from "sequelize";
import sequelize from "../db";
import Product from "./Product";
import Purchase from "./purchase";

const PurchaseItem = sequelize.define("PurchaseItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relaciones
Purchase.hasMany(PurchaseItem, { foreignKey: "purchaseId" });
PurchaseItem.belongsTo(Purchase, { foreignKey: "purchaseId" });

Product.hasMany(PurchaseItem, { foreignKey: "productId" });
PurchaseItem.belongsTo(Product, { foreignKey: "productId" });

export default PurchaseItem;
