import {Request} from "express";
import {SaveVpcSubnetRequest} from "../types/dto/saveVpcSubnetRequest";
import {DescribeSubnetsCommand} from "@aws-sdk/client-ec2";
import {DescribeSubnetsCommandOutput} from "@aws-sdk/client-ec2/dist-types/commands";
import {Subnet, Tag} from "@aws-sdk/client-ec2/dist-types/models";
import {SubnetIpv6CidrBlockAssociation,} from "@aws-sdk/client-ec2/dist-types/models/models_0";
import {SubnetIpv6CidrBlockAssociationEntity} from "../types/entity/subnetIpv6CidrBlockAssociationEntity";
import {tagsEntity} from "../types/entity/tagsEntity";
import {ModelStatic} from "sequelize";
import db from "../model";
import {createEC2Client} from "./ec2Service";
import {SaveVpcSubnetResponse} from "../types/dto/saveVpcSubnetResponse";

export default async (request: Request) => {
    const requestBody: SaveVpcSubnetRequest = request.body;

    const client = createEC2Client(requestBody);

    let command, input;
    let data: DescribeSubnetsCommandOutput;
    let subnets: Subnet[] | undefined;
    let nextToken: string | undefined = undefined;

    do {
        input = (nextToken == undefined) ? {} : {NextToken: nextToken};
        command = new DescribeSubnetsCommand(input);
        data = await client.send(command);

        subnets = data.Subnets;
        nextToken = data.NextToken;

        if (subnets != undefined) {
            subnets.forEach((subnet) => {
                insertSubnet(subnet, requestBody.region);
            });
        }
    } while (nextToken != undefined)

    const msg: SaveVpcSubnetResponse = {
        status: 200,
        statusMessage: "SubnetsInfoSavedSuccess"
    }

    return msg;
}

const insertSubnet = async (subnet: Subnet, region: string) => {
    const includeStatement: ModelStatic<any>[] = [];
    if(subnet.Ipv6CidrBlockAssociationSet != undefined && subnet.Ipv6CidrBlockAssociationSet.length != 0) {
        includeStatement.push(db.SubnetIpv6CidrBlock);
    }
    if(subnet.Tags != undefined && subnet.Tags.length != 0) includeStatement.push(db.Tags);

    console.log(includeStatement);

    await db.Subnet.create(subnetToEntity(subnet, region), {include: includeStatement})
        .catch((error) => {
                db.Subnet.destroy({where: {subnetId: error.fields.PRIMARY}}).then(() => {
                    db.Subnet.create(subnetToEntity(subnet, region), {include: includeStatement});
                });
            }
        );
}

const subnetToEntity = (subnet: Subnet, region: string) => {
    return {
        subnetId: subnet.SubnetId,
        region: region,
        availabilityZoneId: subnet.AvailabilityZone,
        availableIpAddressCount: subnet.AvailableIpAddressCount,
        cidrBlock: subnet.CidrBlock,
        defaultForAz: subnet.DefaultForAz,
        enableLniAtDeviceIndex: subnet.EnableLniAtDeviceIndex,
        mapPublicIpOnLaunch: subnet.MapPublicIpOnLaunch,
        mapCustomerOwnedIpOnLaunch: subnet.MapCustomerOwnedIpOnLaunch,
        customerOwnedIpv4Pool: subnet.CustomerOwnedIpv4Pool,
        state: subnet.State,
        vpcId: subnet.VpcId,
        ownerId: subnet.OwnerId,
        assignIpv6AddressOnCreation: subnet.AssignIpv6AddressOnCreation,
        subnetArn: subnet.SubnetArn,
        outpostArn: subnet.OutpostArn,
        enableDns64: subnet.EnableDns64,
        ipv6Native: subnet.Ipv6Native,
        hostnameType: subnet.PrivateDnsNameOptionsOnLaunch?.HostnameType,
        enableResourceNameDnsARecord: subnet.PrivateDnsNameOptionsOnLaunch?.EnableResourceNameDnsARecord,
        enableResourceNameDnsAAAARecord: subnet.PrivateDnsNameOptionsOnLaunch?.EnableResourceNameDnsAAAARecord,
        SubnetIpv6CidrBlockAssociations: subnetIpv6CidrBlockAssociationToEntity(subnet.Ipv6CidrBlockAssociationSet),
        Tags: tagsToEntity(subnet.Tags)
    }
}

const subnetIpv6CidrBlockAssociationToEntity = (subnetIpv6CidrBlockSet: SubnetIpv6CidrBlockAssociation[] | undefined) => {
    const subnetIpv6CidrBlockArr: SubnetIpv6CidrBlockAssociationEntity[] = [];

    if(subnetIpv6CidrBlockSet != undefined && subnetIpv6CidrBlockSet.length != 0){
        subnetIpv6CidrBlockSet.forEach((subnetIpv6CidrBlock) => {
            subnetIpv6CidrBlockArr.push({
                associationId: subnetIpv6CidrBlock.AssociationId,
                ipv6CidrBlock: subnetIpv6CidrBlock.Ipv6CidrBlock,
                ipv6CidrBlockStateCode: subnetIpv6CidrBlock.Ipv6CidrBlockState?.State,
                ipv6CidrBlockStatusMessage: subnetIpv6CidrBlock.Ipv6CidrBlockState?.StatusMessage
            });
        });
    }

    return subnetIpv6CidrBlockArr;
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