import { Request } from 'express'
import {SaveVpcSubnetRequest} from "../types/dto/saveVpcSubnetRequest";
import {DescribeVpcsCommand} from "@aws-sdk/client-ec2";
import { DescribeVpcsCommandOutput } from "@aws-sdk/client-ec2/dist-types/commands";
import {Tag, Vpc, VpcIpv6CidrBlockAssociation} from "@aws-sdk/client-ec2/dist-types/models";
import {VpcIpv6CidrBlockAssociationEntity} from "../types/entity/vpcIpv6CidrBlockAssociationEntity";
import {VpcCidrBlockAssociation} from "@aws-sdk/client-ec2/dist-types/models/models_0";
import db from "../model";
import {VpcCidrBlockAssociationEntity} from "../types/entity/vpcCidrBlockAssociationEntity";
import {tagsEntity} from "../types/entity/tagsEntity";
import {ModelStatic} from "sequelize";
import {createEC2Client} from "./ec2Service";
import {SaveVpcSubnetResponse} from "../types/dto/saveVpcSubnetResponse";

/**
 * vpc 정보 저장
 * @param request apikey + secret + region
 */
export default async (request: Request) => {
    const requestBody: SaveVpcSubnetRequest = request.body;

    const client = createEC2Client(requestBody);

    let command, input;
    let data: DescribeVpcsCommandOutput;
    let vpcs: Vpc[] | undefined;
    let nextToken: string | undefined = undefined;

    // nextToken 없을 때 까지 반복
    do {
        input = (nextToken == undefined) ? {} : {NextToken: nextToken};
        command = new DescribeVpcsCommand({});
        data = await client.send(command);

        vpcs = data.Vpcs;
        nextToken = data.NextToken;

        if (vpcs != undefined) {
            vpcs.forEach((vpc) => {
                insertVpc(vpc, requestBody.region);
            });
        }
    } while (nextToken != undefined)

    const msg: SaveVpcSubnetResponse = {
        status: 200,
        statusMessage: "VpcsInfoSavedSuccess"
    }

    return msg;
}

/**
 * vpc와 자식 관계 데이터 Insert, 이미 존재 시 하위 데이터 모두 삭제 후 Insert
 * @param vpc vpc
 * @param region region
 */
const insertVpc = async (vpc: Vpc, region: string) => {
    const includeStatement: ModelStatic<any>[] = [];
    if(vpc.Ipv6CidrBlockAssociationSet != undefined && vpc.Ipv6CidrBlockAssociationSet.length != 0){
        includeStatement.push(db.VpcIpv6CidrBlock);
    }
    if(vpc.CidrBlockAssociationSet != undefined && vpc.CidrBlockAssociationSet.length != 0) includeStatement.push(db.VpcCidrBlock);
    if(vpc.Tags != undefined && vpc.Tags.length != 0) includeStatement.push(db.Tags);

    await db.Vpc.create(vpcToEntity(vpc, region), {include: includeStatement})
        .catch((error) => {
            db.Vpc.destroy({where: {vpcId: error.fields.PRIMARY}}).then(() => {
                db.Vpc.create(vpcToEntity(vpc, region), {include: includeStatement});
            });
        }
    );
}

const vpcToEntity = (vpc: Vpc, region: string) => {
    return {
        vpcId: vpc.VpcId,
        region: region,
        vpcCidrBlock: vpc.CidrBlock,
        dhcpOptionsId: vpc.DhcpOptionsId,
        state: vpc.State,
        ownerId: vpc.OwnerId,
        instanceTenancy: vpc.InstanceTenancy,
        isDefault: vpc.IsDefault,
        VpcIpv6CidrBlockAssociations: vpcIpv6CidrBlockToEntity(vpc.Ipv6CidrBlockAssociationSet),
        VpcCidrBlockAssociations: vpcCidrBlockToEntity(vpc.CidrBlockAssociationSet),
        Tags: tagsToEntity(vpc.Tags)
    }
}

const vpcIpv6CidrBlockToEntity = (vpcIpv6CidrBlockSet: VpcIpv6CidrBlockAssociation[] | undefined) => {
    const vpcIpv6CidrBlockArr: VpcIpv6CidrBlockAssociationEntity[] = [];

    if(vpcIpv6CidrBlockSet != undefined) {
        vpcIpv6CidrBlockSet.forEach((vpcIpv6CidrBlock) => {
            vpcIpv6CidrBlockArr.push({
                ipv6AssociationId: vpcIpv6CidrBlock.AssociationId,
                ipv6CidrBlock: vpcIpv6CidrBlock.Ipv6CidrBlock,
                ipv6CidrBlockStateCode: vpcIpv6CidrBlock.Ipv6CidrBlockState?.State,
                ipv6CidrBlockStatusMessage: vpcIpv6CidrBlock.Ipv6CidrBlockState?.StatusMessage,
                networkBorderGroup: vpcIpv6CidrBlock.NetworkBorderGroup,
                ipv6Pool: vpcIpv6CidrBlock.Ipv6Pool
            });
        });
    }

    return vpcIpv6CidrBlockArr;
}

const vpcCidrBlockToEntity = (vpcCidrBlockSet: VpcCidrBlockAssociation[] | undefined) => {
    const vpcCidrBlockArr: VpcCidrBlockAssociationEntity[] = [];

    if(vpcCidrBlockSet != undefined){
        vpcCidrBlockSet.forEach((vpcCidrBlock) => {
            vpcCidrBlockArr.push({
                associationId: vpcCidrBlock.AssociationId,
                cidrBlock: vpcCidrBlock.CidrBlock,
                cidrBlockStateCode: vpcCidrBlock.CidrBlockState?.State,
                cidrBlockStatusMessage: vpcCidrBlock.CidrBlockState?.StatusMessage
            });
        });
    }

    return vpcCidrBlockArr;
}

const tagsToEntity = (tags: Tag[] | undefined) => {
    const tagsArr: tagsEntity[] = [];

    if(tags != undefined){
        tags.forEach((tag) => {
            tagsArr.push({
                key: tag.Key,
                value: tag.Value
            });
        });
    }

    return tagsArr;
}