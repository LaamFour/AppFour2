import { DataTypes } from 'sequelize';
import { connection } from '~/config';
import { TABLE_NAMES } from '~/constants';
import type { OrderItemModelDefined } from '~/interfaces';

const OrderItemModel = connection.define<OrderItemModelDefined>(
  TABLE_NAMES.ORDER_ITEMS,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    import_price: {
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

export default OrderItemModel;
