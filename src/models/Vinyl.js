import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Vinyl = sequelize.define("Vinyl", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    tableName: "vinyls",
    timestamps: true
});

