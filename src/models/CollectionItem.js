import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const CollectionItem = sequelize.define("CollectionItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    vinylId: { type: DataTypes.INTEGER, allowNull: false },
    condition: { type: DataTypes.STRING },
    notes: { type: DataTypes.TEXT },
    photos: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "[]",
        get() {
            const raw = this.getDataValue("photos");
            try {
                return JSON.parse(raw || "[]");
            } catch {
                return [];
            }
        },
        set(value) {
            this.setDataValue("photos", JSON.stringify(value || []));
        },
    },
}, {
    tableName: "collection_items",
    timestamps: true,
});
