import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define("VpcIpv6CidrBlockAssociation", {
        ipv6AssociationId:{
            field: "ipv6_association_id",
            primaryKey: true,
            type: DataTypes.STRING
        },
        ipv6CidrBlock: {
            field: "ipv6_cidr_block",
            type: DataTypes.STRING
        },
        ipv6CidrBlockStateCode: {
            field: "ipv6_cidr_block_state_code",
            type: DataTypes.STRING
        },
        ipv6CidrBlockStatusMessage: {
            field: "ipv6_cidr_block_status_message",
            type: DataTypes.STRING
        },
        networkBorderGroup: {
            field: "network_border_group",
            type: DataTypes.STRING
        },
        ipv6Pool: {
            field: "ipv6_pool",
            type: DataTypes.STRING
        }
    });
}