import { RequestHandler } from 'express';
import { AddressModel } from '~/models';
import { response } from '~/utils';

const getAddresses: RequestHandler<unknown, unknown, any, unknown> = async (
  req,
  res,
  next,
) => {
  try {
    // @ts-ignore
    const uid = req.user.id;

    const addresses = await AddressModel.findAll({
      where: {
        customer_id: uid,
      },
    });

    return response(res, {
      status_code: 200,
      data: addresses,
    });
  } catch (error) {}
};
const createAddress: RequestHandler<unknown, unknown, any, unknown> = async (
  req,
  res,
  next,
) => {
  // @ts-ignore
  const uid = req.user.id;
  const {
    fullname,
    phone_number,
    is_default,
    specific_address,
    latitude,
    longitude,
  } = req.body;

  try {
    if (is_default === true) {
      await AddressModel.update(
        { is_default: false },
        { where: { customer_id: uid } },
      );
    }

    const newAddress = await AddressModel.create({
      fullname,
      phone_number,
      is_default: is_default ?? false,
      customer_id: uid,
      specific_address,
      latitude,
      longitude,
    });

    return response(res, {
      status_code: 201,
      data: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const addressController = {
  createAddress,
  getAddresses,
};
