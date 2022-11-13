import {VpcCidrBlockStateCode} from "@aws-sdk/client-ec2/dist-types/models/models_0";

export interface VpcCidrBlockAssociationEntity {

    associationId?: string;

    cidrBlock?: string;

    cidrBlockStateCode?: VpcCidrBlockStateCode | string;

    cidrBlockStatusMessage?: string;
}