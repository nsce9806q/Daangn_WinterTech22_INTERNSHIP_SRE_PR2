import {Sequelize} from "sequelize";
import Vpc from "./vpc";
import VpcCidrBlockAssociation from "./vpcCidrBlockAssociation";
import VpcIpv6CidrBlockAssociation from "./vpcIpv6CidrBlockAssociation";
import Tags from "./tags";
import Subnet from "./subnet";
import SubnetIpv6CidrBlockAssociation from "./subnetIpv6CidrBlockAssociation";

const sequelize = new Sequelize("test", 'root', 'pass1234', {
    host: 'localhost',
    port: 3306,
    dialect: "mysql"
});

const db = {
    sequelize: sequelize,
    Vpc: Vpc(sequelize),
    VpcCidrBlock: VpcCidrBlockAssociation(sequelize),
    VpcIpv6CidrBlock: VpcIpv6CidrBlockAssociation(sequelize),
    Tags: Tags(sequelize),
    Subnet: Subnet(sequelize),
    SubnetIpv6CidrBlock: SubnetIpv6CidrBlockAssociation(sequelize),
};

db.Vpc.hasMany(db.VpcCidrBlock, {foreignKey: "vpc_id", sourceKey: "vpcId", onDelete: "cascade"});
db.VpcCidrBlock.belongsTo(db.Vpc, {foreignKey: "vpc_id", onDelete: "cascade"});
db.Vpc.hasMany(db.VpcIpv6CidrBlock, {foreignKey: "vpc_id", sourceKey: "vpcId", onDelete: "cascade"});
db.VpcIpv6CidrBlock.belongsTo(db.Vpc, {foreignKey: "vpc_id", onDelete: "cascade"});

db.Vpc.belongsToMany(db.Tags, {through: "VpcsHasTags", onDelete: "cascade"});
db.Tags.belongsToMany(db.Vpc, {through: "VpcsHasTags", onDelete: "cascade"});

db.Subnet.hasMany(db.SubnetIpv6CidrBlock, {foreignKey: "subnet_id", sourceKey: "subnetId", onDelete: "cascade"});
db.SubnetIpv6CidrBlock.belongsTo(db.Subnet, {foreignKey: "subnet_id", onDelete: "cascade"});

db.Subnet.belongsToMany(db.Tags, {through: "SubnetsHasTags", onDelete: "cascade"});
db.Tags.belongsToMany(db.Subnet, {through: "SubnetsHasTags", onDelete: "cascade"});

export default db;