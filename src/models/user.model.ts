import { DataTypes } from 'sequelize';
import { connection } from '~/config';
import { TABLE_NAMES } from '~/constants';
import type { UserModelDefined } from '~/interfaces';

const UserModel = connection.define<UserModelDefined>(
  TABLE_NAMES.USERS,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_expired: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

export default UserModel;
