import { Router, Request, Response } from 'express'
import saveVpcsService from "../service/saveVpcsService";
import saveSubnetService from "../service/saveSubnetService";

export default () => {

    const app = Router();

    app.get("/", (request: Request, response: Response) => {
        response.send("health check");
    });

    app.post("/save_vpcs", async (request: Request, response: Response) => {
        try {
            response.json(await saveVpcsService(request));
        } catch (error: any) {
            if(error.Code == "AuthFailure"){
                response.status(401).send("AuthFailure");
            }
        }
    });

    app.post("/save_subnets", async (request: Request, response: Response) => {
        try {
            response.json(await saveSubnetService(request));
        } catch (error: any) {
            if(error.Code == "AuthFailure"){
                response.status(401).send("AuthFailure");
            }
        }
    })

    return app;
}