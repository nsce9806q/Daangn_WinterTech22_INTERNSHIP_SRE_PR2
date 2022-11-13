import express from "express";
import expressLoader from "./express";
import sequelizeLoader from "./sequelize"

export default async (app: express.Application) => {
    await sequelizeLoader();
    await expressLoader(app);
}