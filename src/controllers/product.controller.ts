import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { Op } from 'sequelize';
import unidecode from 'unidecode';
import type { Product } from '~/interfaces';
import { ProductModel } from '~/models';
import type {
  CreateProductBody,
  DeleteProductParams,
  GetProductParams,
  GetProductsQuery,
  UpdateProductBody,
  UpdateProductParams,
} from '~/schemas';
import { response } from '~/utils';

const createProduct: RequestHandler<
  unknown,
  unknown,
  CreateProductBody,
  unknown
> = async (req, res, next) => {
  try {
    await ProductModel.sync({});
    const newProduct = await ProductModel.create({
      ...req.body,
    });

    return response(res, {
      status_code: 201,
      data: newProduct.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct: RequestHandler<
  UpdateProductParams,
  unknown,
  UpdateProductBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    import_price,
    price,
    promotional_price,
    quantity,
    image,
  } = req.body;

  try {
    const productExists = await ProductModel.findByPk(id);

    if (!productExists) {
      throw createHttpError(404, req.t('product_not_found_exception'));
    }

    const fields: Product = {
      name,
      description,
      import_price,
      price,
      promotional_price,
      quantity,
      image,
    };

    productExists.update({ ...fields });
    productExists.save();

    return response(res, {
      status_code: 200,
      data: productExists,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct: RequestHandler<
  DeleteProductParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productExists = await ProductModel.findByPk(id);

    if (!productExists) {
      throw createHttpError(404, req.t('product_not_found_exception'));
    }

    productExists.destroy();

    return response(res, {
      status_code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts: RequestHandler<
  unknown,
  unknown,
  unknown,
  GetProductsQuery
> = async (req, res, next) => {
  const { search } = req.query;

  try {
    if (!search) {
      const products = await ProductModel.findAll({
        attributes: { exclude: ['quantity'] },
      });

      return response(res, {
        status_code: 200,
        data: products,
      });
    }

    const normalizedSearchQuery = unidecode(search);

    const products = await ProductModel.findAll({
      where: {
        name: {
          [Op.like]: `%${normalizedSearchQuery.trim()}%`,
        },
      },
    });

    return response(res, {
      status_code: 200,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct: RequestHandler<
  GetProductParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productExists = await ProductModel.findByPk(id, {
      attributes: { exclude: ['quantity'] },
    });

    if (!productExists) {
      throw createHttpError(404, req.t('product_not_found_exception'));
    }
    return response(res, {
      status_code: 200,
      data: productExists,
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
};
