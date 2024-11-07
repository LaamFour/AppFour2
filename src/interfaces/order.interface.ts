import {
  CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from 'sequelize';
import { OrderStatus } from './order-status.interface';

export interface Order {
  id: number;
  customer_id: number;
  total_price: number;
  delivery_id: number;
  status: OrderStatus;
  created_at?: Date;
  updated_at?: Date;
  fullname?: string;
  phone_number?: string;
  specific_address?: string;
  latitude?: string;
  longitude?: string;
}

export type OrderCreation = Partial<
  Pick<Order, 'delivery_id' | 'customer_id'>
> &
  Omit<Order, 'delivery_id' | 'customer_id' | 'id'> & {
    fullname: string;
    phone_number: string;
    specific_address: string;
    latitude: string;
    longitude: string;
  };

export interface OrderModelDefined
  extends Model<
      InferAttributes<OrderModelDefined>,
      InferCreationAttributes<OrderModelDefined>
    >,
    OrderCreation {
  id?: CreationOptional<number>;
}
