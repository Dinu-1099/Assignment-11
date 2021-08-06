'use strict';
import { Model, Op } from 'sequelize';
import db from '.';

interface UserAttribute {
  id: number;
  userid: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  rolekey: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttribute> implements UserAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    userid!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    contact!: string;
    address!: string;
    rolekey!: number;
    static associate(models: any) {
      // define association here
      User.belongsTo(models.Customer, {
        foreignKey: 'userid',
        targetKey: 'userid',
        scope: {
          [Op.and]: sequelize.where(
            sequelize.col('User.userid'),
            '=',
            sequelize.col('Customer.userid')
          ),
        },
        constraints: false,
      });
      User.belongsTo(models.role, {
        foreignKey: 'rolekey',
        targetKey: 'rolekey',
        scope: {
          [Op.and]: sequelize.where(
            sequelize.col('User.rolekey'),
            '=',
            sequelize.col('role.rolekey')
          ),
        },
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rolekey: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
