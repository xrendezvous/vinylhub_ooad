import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    buyerId: { type: DataTypes.INTEGER, allowNull: false },
    listingId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    status: {
        type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED", "REFUNDED"),
        defaultValue: "PENDING",
    },
}, {
    tableName: "payments",
    timestamps: true,
});

