import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define("VpcCidrBlockAssociation", {
        associationId: {
            field: "ipv6_association_id",
            primaryKey: true,
            type: DataTypes.STRING
        },
        cidrBlock: {
            field: "cidr_block",
            type: DataTypes.STRING
        },
        cidrBlockStateCode: {
            field: "cidr_block_state_code",
            type: DataTypes.STRING
        },
        cidrBlockStatusMessage: {
            field: "cidr_block_status_message",
            type: DataTypes.STRING
        }
    });
}