import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define("Vpc", {
        vpcId: {
            field: "vpc_id",
            primaryKey: true,
            type: DataTypes.STRING
        },
        region: {
            type: DataTypes.STRING
        },
        vpcCidrBlock: {
            field: "vpc_cidr_block",
            type: DataTypes.STRING
        },
        dhcpOptionsId: {
            field: "dhcp_options_id",
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        ownerId: {
            field: "owner_id",
            type: DataTypes.STRING
        },
        instanceTenancy: {
            field: "instance_tenancy",
            type: DataTypes.STRING
        },
        isDefault: {
            field: "is_default",
            type: DataTypes.BOOLEAN
        },
    });
}