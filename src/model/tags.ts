import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define("Tags", {
        key: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.STRING
        }
    });
}