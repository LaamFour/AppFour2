import { DataTypes } from 'sequelize';
import { connection } from '~/config';
import { TABLE_NAMES } from '~/constants';
import type { AddressModelDefined } from '~/interfaces';

const AddressModel = connection.define<AddressModelDefined>(
  TABLE_NAMES.ADDRESSES,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
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

export default AddressModel;
