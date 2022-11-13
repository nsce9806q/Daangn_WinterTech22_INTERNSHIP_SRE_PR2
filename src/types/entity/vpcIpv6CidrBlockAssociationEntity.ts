import {VpcCidrBlockStateCode} from "@aws-sdk/client-ec2/dist-types/models/models_0";

export interface VpcIpv6CidrBlockAssociationEntity {

    ipv6AssociationId?: string;


    ipv6CidrBlock?: string;

    ipv6CidrBlockStateCode?: VpcCidrBlockStateCode | string;

    ipv6CidrBlockStatusMessage?: string;

    networkBorderGroup?: string;

    ipv6Pool?: string;
}