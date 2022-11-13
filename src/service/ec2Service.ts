import {EC2Client} from "@aws-sdk/client-ec2";
import {SaveVpcSubnetRequest} from "../types/dto/saveVpcSubnetRequest";

const createEC2Client = (request: SaveVpcSubnetRequest) => {
    return new EC2Client(createEC2config(request));
}

const createEC2config = (request :SaveVpcSubnetRequest) => {
    return {
        region: request.region,
        credentials: {
            accessKeyId: request.accessKeyId,
            secretAccessKey: request.secretAccessKey
        }
    }
}

export { createEC2Client };