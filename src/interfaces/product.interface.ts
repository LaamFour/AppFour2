import {
  CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Model,
} from 'sequelize';

export interface Product {
  id?: number;
  name: string;
  description: string;
  import_price: number;
  price: number;
  promotional_price: number;
  quantity: number;
  image: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ProductCreation = Omit<Product, 'id'>;

export interface ProductModelDefined
  extends Model<
      InferAttributes<ProductModelDefined>,
      InferCreationAttributes<ProductModelDefined>
    >,
    ProductCreation {
  id?: CreationOptional<number>;
}
