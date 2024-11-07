import { DataTypes } from 'sequelize';
import { connection } from '~/config';
import { TABLE_NAMES } from '~/constants';
import { type ProductModelDefined } from '~/interfaces';

const ProductModel = connection.define<ProductModelDefined>(
  TABLE_NAMES.PRODUCTS,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    import_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promotional_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT('long'),
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

export default ProductModel;
