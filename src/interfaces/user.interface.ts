import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import type { Gender, Role } from './common.interface';

export interface User {
  id: number;
  email: string;
  password: string;
  fullname: string;
  picture?: string;
  role?: Role;
  otp_code?: string;
  otp_expired?: Date;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  gender?: Gender;
  phone_number?: string;
  birthdate?: string;
}

export type UserCreation = Omit<User, 'id'>;

export interface UserModelDefined
  extends Model<
      InferAttributes<UserModelDefined>,
      InferCreationAttributes<UserModelDefined>
    >,
    UserCreation {
  id?: CreationOptional<number>;
}
