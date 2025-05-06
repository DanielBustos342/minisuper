import { DataTypes, Model } from "sequelize";
import sequelize from "../db"; // importa tu instancia de Sequelize

interface PurchaseAttributes {
  id?: number;
  total: number;
}

class Purchase extends Model<PurchaseAttributes> implements PurchaseAttributes {
  public id!: number;
  public total!: number;
}

Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Purchase",
    tableName: "purchases",
    timestamps: false,
  }
);

export default Purchase;
