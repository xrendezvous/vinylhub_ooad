import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Vinyl = sequelize.define(
    "Vinyl",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const raw = this.getDataValue("genre");
                try {
                    return raw ? JSON.parse(raw) : [];
                } catch {
                    return [raw];
                }
            },
            set(value) {
                this.setDataValue("genre", JSON.stringify(value || []));
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        tableName: "vinyls",
        timestamps: true,
    }
);
