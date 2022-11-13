import express from "express";
import loaders from "./loaders";

const startServer = async () => {
    const app: express.Application = express();
    await loaders(app);

    app.listen(3000, () => {
        console.log("API-Server listening on port 3000");
    })
}

(async () => await startServer())();