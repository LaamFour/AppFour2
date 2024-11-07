import * as yup from 'yup';
import i18n from '~/i18n';

export type GetProductsQuery = yup.InferType<
  Required<typeof getProductsSchema>
>['query'];

export type CreateProductBody = yup.InferType<
  typeof createProductSchema
>['body'];

export type UpdateProductParams = yup.InferType<
  Required<typeof updateProductSchema>
>['params'];
export type UpdateProductBody = yup.InferType<
  typeof updateProductSchema
>['body'];

export type DeleteProductParams = yup.InferType<
  Required<typeof deleteProductSchema>
>['params'];

export interface GetProductParams {
  id: string;
}

export const getProductsSchema = yup.object({
  query: yup.object({
    search: yup.string(),
  }),
});

export const createProductSchema = yup.object({
  body: yup.object({
    name: yup.string().required(i18n.t('product_name_required')),
    description: yup.string().required(i18n.t('product_desc_required')),
    import_price: yup.number().required(i18n.t('import_price_required')),
    price: yup.number().required(i18n.t('price_required')),
    promotional_price: yup
      .number()
      .required(i18n.t('promotional_price_required')),
    quantity: yup.number().required(i18n.t('quantity_required')),
    image: yup.string().required(i18n.t('product_image_required')),
  }),
});

export const updateProductSchema = yup.object({
  params: yup.object({
    id: yup.string().required(),
  }),
  body: yup.object({
    name: yup.string().required(i18n.t('product_name_required')),
    description: yup.string().required(i18n.t('product_desc_required')),
    import_price: yup.number().required(i18n.t('import_price_required')),
    price: yup.number().required(i18n.t('price_required')),
    promotional_price: yup
      .number()
      .required(i18n.t('promotional_price_required')),
    quantity: yup.number().required(i18n.t('quantity_required')),
    image: yup.string().required(i18n.t('product_image_required')),
  }),
});

export const deleteProductSchema = yup.object().shape({
  params: yup.object({
    id: yup.string().required(),
  }),
});
