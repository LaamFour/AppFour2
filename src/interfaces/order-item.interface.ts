import {
  CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from 'sequelize';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  import_price: number;
  created_at?: Date;
  updated_at?: Date;
}

export type OrderItemCreation = Partial<
  Pick<OrderItem, 'order_id' | 'product_id'>
> &
  Omit<OrderItem, 'order_id' | 'product_id' | 'id'>;

export interface OrderItemModelDefined
  extends Model<
      InferAttributes<OrderItemModelDefined>,
      InferCreationAttributes<OrderItemModelDefined>
    >,
    OrderItemCreation {
  id?: CreationOptional<number>;
}
