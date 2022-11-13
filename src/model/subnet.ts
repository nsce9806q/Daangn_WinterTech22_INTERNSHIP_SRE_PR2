import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define("Subnet", {
        subnetId:  {
            field: "subnet_id",
            primaryKey: true,
            type: DataTypes.STRING
        },
        region: {
            type: DataTypes.STRING
        },
        availabilityZone: {
            field: "availability_zone",
            type: DataTypes.STRING
        },
        availabilityZoneId: {
            field: "availability_zone_id",
            type: DataTypes.STRING
        },
        availableIpAddressCount: {
            field: "available_ip_address_count",
            type: DataTypes.INTEGER
        },
        cidrBlock: {
            field: "cidr_block",
            type: DataTypes.STRING
        },
        defaultForAz: {
            field: "default_for_az",
            type: DataTypes.BOOLEAN
        },
        enableLniAtDeviceIndex: {
            field: "enable_lni_at_device_index",
            type: DataTypes.INTEGER
        },
        mapPublicIpOnLaunch: {
            field: "map_public_ip_on_launch",
            type: DataTypes.BOOLEAN
        },
        mapCustomerOwnedIpOnLaunch: {
            field: "map_customer_owned_ip_on_launch",
            type: DataTypes.BOOLEAN
        },
        customerOwnedIpv4Pool: {
            field: "customer_owned_ipv_4_pool",
            type: DataTypes.STRING
        },
        state: {
            field: "state",
            type: DataTypes.STRING
        },
        vpcId: {
            field: "vpc_id",
            type: DataTypes.STRING
        },
        ownerId: {
            field: "",
            type: DataTypes.STRING
        },
        assignIpv6AddressOnCreation: {
            field: "assign_ipv_6_address_on_creation",
            type: DataTypes.INTEGER
        },
        subnetArn: {
            field: "subnet_arn",
            type: DataTypes.STRING
        },
        outpostArn: {
            field: "outpost_arn",
            type: DataTypes.STRING
        },
        enableDns64: {
            field: "enable_dns_64",
            type: DataTypes.BOOLEAN
        },
        ipv6Native: {
            field: "ipv_6_native",
            type: DataTypes.BOOLEAN
        },
        hostnameType: {
            field: "host_name_type",
            type: DataTypes.STRING
        },
        enableResourceNameDnsARecord: {
            field: "enable_resource_name_dns_A_record",
            type: DataTypes.BOOLEAN
        },
        enableResourceNameDnsAAAARecord: {
            field: "enable_resource_name_dns_AAAA_record",
            type: DataTypes.BOOLEAN
        }
    });
}