'use strict';
import { Model } from 'sequelize';
interface CustomerAttribute {
  id: number;
  customerName: string;
  website: string;
  address: string;
  userid: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Customer extends Model<CustomerAttribute> implements CustomerAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    customerName!: string;
    website!: string;
    address!: string;
    userid!: string;
    static associate(models: any) {
      // define association here
    }
  }
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    }
  );
  return Customer;
};
