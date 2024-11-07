import AddressModel from './address.model';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import ProductModel from './product.model';
import UserModel from './user.model';

export { default as AddressModel } from './address.model';
export { default as OrderItemModel } from './order-item.model';
export { default as OrderModel } from './order.model';
export { default as ProductModel } from './product.model';
export { default as UserModel } from './user.model';

OrderModel.belongsTo(UserModel, {
  foreignKey: 'customer_id',
  as: 'customer',
});
OrderModel.belongsTo(UserModel, {
  foreignKey: 'delivery_id',
  as: 'delivery',
});

OrderModel.hasMany(OrderItemModel, {
  foreignKey: 'order_id',
});
OrderItemModel.belongsTo(OrderModel, {
  foreignKey: 'order_id',
  // as: 'order',
});
OrderItemModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  // as: 'product'
});

UserModel.hasMany(AddressModel, {
  foreignKey: 'customer_id',
});
AddressModel.belongsTo(UserModel, {
  foreignKey: 'customer_id',
});

OrderModel.sync({
  // keep
});

OrderItemModel.sync({
  // keep
});

ProductModel.sync({
  // keep
});

UserModel.sync({
  // keep
});

AddressModel.sync({
  // keep
});
