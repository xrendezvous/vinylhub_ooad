import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Listing = sequelize.define("Listing", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sellerId: { type: DataTypes.INTEGER, allowNull: false },
    vinylId: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    currency: { type: DataTypes.STRING, defaultValue: "UAH" },
    status: { type: DataTypes.ENUM("ACTIVE", "SOLD", "CANCELLED"), defaultValue: "ACTIVE" },
}, {
    tableName: "listings",
    timestamps: true,
});

