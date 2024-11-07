import { DataTypes } from 'sequelize';
import { connection } from '~/config';
import { TABLE_NAMES } from '~/constants';
import type { OrderModelDefined } from '~/interfaces';

const OrderModel = connection.define<OrderModelDefined>(
  TABLE_NAMES.ORDERS,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specific_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default OrderModel;
