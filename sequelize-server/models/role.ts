'use strict';
import { Model } from 'sequelize';
interface RoleAttribute {
  id: number;
  roleName: String;
  rolekey: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class role extends Model<RoleAttribute> implements RoleAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    roleName!: String;
    rolekey!: number;
    static associate(models: any) {
      // define association here
    }
  }
  role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rolekey: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    },
    {
      sequelize,
      modelName: 'role',
    }
  );
  return role;
};
