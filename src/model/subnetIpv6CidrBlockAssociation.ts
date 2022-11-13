import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define("SubnetIpv6CidrBlockAssociation", {
        associationId: {
            primaryKey: true,
            field: "association_id",
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
        }
    });
}