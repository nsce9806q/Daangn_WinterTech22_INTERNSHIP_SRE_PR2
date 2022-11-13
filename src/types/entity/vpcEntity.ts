import {Tenancy, VpcState} from "@aws-sdk/client-ec2/dist-types/models/models_1";

export interface VpcEntity {

    vpc_id?: string;

    region?: string;

    vpc_cidr_block?: string;

    dhcp_options_id?: string;

    state?: VpcState | string;

    owner_id?: string;

    instance_tenancy?: Tenancy | string;

    is_default?: boolean;
}