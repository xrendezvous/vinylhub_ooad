import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const WishlistItem = sequelize.define("WishlistItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    vinylId: { type: DataTypes.INTEGER },
    queryText: { type: DataTypes.STRING },
}, {
    tableName: "wishlist_items",
    timestamps: true,
});

