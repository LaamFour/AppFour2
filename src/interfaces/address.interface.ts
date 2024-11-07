import {
  CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from 'sequelize';

export interface Address {
  id: number;
  customer_id?: number;
  fullname: string;
  phone_number: string;
  is_default: boolean;
  specific_address: string;
  latitude: string;
  longitude: string;
  created_at?: Date;
  updated_at?: Date;
}

export type AddressCreation = Omit<Address, 'id'>;

export interface AddressModelDefined
  extends Model<
      InferAttributes<AddressModelDefined>,
      InferCreationAttributes<AddressModelDefined>
    >,
    AddressCreation {
  id?: CreationOptional<number>;
}
