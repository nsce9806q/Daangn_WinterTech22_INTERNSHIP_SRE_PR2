import {EC2Client} from "@aws-sdk/client-ec2";
import {SaveVpcSubnetRequest} from "../types/dto/saveVpcSubnetRequest";

/**
 * EC2Client 생성
 * @param request apikey + secret + region
 */
const createEC2Client = (request: SaveVpcSubnetRequest) => {
    return new EC2Client(createEC2config(request));
}
/**
 * EC2Client 설정 생성
 * @param request apikey + secret + region
 */
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