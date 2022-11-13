import {HostnameType, SubnetState} from "@aws-sdk/client-ec2/dist-types/models/models_0";

export interface SubnetEntity {
    subnetId?: string;
    region?: string;
    availabilityZone?: string;
    availabilityZoneId?: string;
    availableIpAddressCount?: number;
    cidrBlock?: string;
    defaultForAz?: boolean;
    enableLniAtDeviceIndex?: number;
    mapPublicIpOnLaunch?: boolean;
    mapCustomerOwnedIpOnLaunch?: boolean;
    customerOwnedIpv4Pool?: string;
    state?: SubnetState | string;
    vpcId?: string;
    ownerId?: string;
    assignIpv6AddressOnCreation?: boolean;
    subnetArn?: string;
    outpostArn?: string;
    enableDns64?: boolean;
    ipv6Native?: boolean;
    hostnameType?: HostnameType | string;
    enableResourceNameDnsARecord?: boolean;
    enableResourceNameDnsAAAARecord?: boolean;
}