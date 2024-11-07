import * as yup from 'yup';

export type CreateOrderBody = yup.InferType<typeof createOrderSchema>['body'];

export type UpdateOrderBody = yup.InferType<typeof updateOrderSchema>['body'];
export type UpdateOrderParams = yup.InferType<
  typeof updateOrderSchema
>['params'];
export const createOrderSchema = yup.object({
  body: yup.object({
    fullname: yup.string().required(),
    phone_number: yup.string().required(),
    specific_address: yup.string().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
    items: yup
      .array()
      .of(
        yup.object().shape({
          product_id: yup.number().required(),
          quantity: yup.number().required(),
          // price: yup.number().required(),
          // import_price: yup.number().required(),
        }),
      )
      .required(),
  }),
});

export const updateOrderSchema = yup.object({
  params: yup.object({
    id: yup.number().required(),
  }),
  body: yup.object({
    status: yup
      .string()
      .oneOf(['pending', 'delivering', 'completed', 'canceled'])
      .required(),
  }),
});
