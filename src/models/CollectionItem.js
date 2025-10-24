import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const CollectionItem = sequelize.define("CollectionItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    vinylId: { type: DataTypes.INTEGER, allowNull: false },
    condition: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
}, {
    tableName: "collection_items",
    timestamps: true,
});

