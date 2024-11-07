import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import _ from 'lodash';
import type { User, UserCreation } from '~/interfaces';
import { UserModel } from '~/models';
import type { LoginBody, SignUpBody, VerifyEmailBody } from '~/schemas';
import {
  comparePassword,
  generateOTP,
  generateToken,
  hashPassword,
  response,
  sendEmail,
} from '~/utils';

const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (
  req,
  res,
  next,
) => {
  const { email, password, fullname } = req.body;

  try {
    const userExists = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      throw createHttpError(409, req.t('email_already_in_use'));
    }

    const otp = generateOTP();

    const subject = req.t('email_verification');
    const message = `${req.t('your_otp_code_is')}: ${otp}`;
    await sendEmail(email, subject, message);

    const hashedPassword = await hashPassword(password);

    const payload: UserCreation = {
      email,
      fullname,
      otp_code: otp,
      otp_expired: new Date(Date.now() + 10 * 60 * 1000),
      is_verified: false,
      password: hashedPassword,
      role: 'customer',
    };
    const newUser = await UserModel.create({
      ...payload,
    });

    return response(res, {
      status_code: 200,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (
  req,
  res,
  next,
) => {
  const { email, password } = req.body;

  try {
    const userExists = await UserModel.findOne({
      where: {
        email,
      },
    });
    const userObj = userExists?.toJSON() as User;
    if (!userExists) {
      throw createHttpError(401, req.t('incorrect_account_or_password'));
    }

    const passwordMatch = await comparePassword(password, userObj.password);

    if (!passwordMatch) {
      throw createHttpError(401, req.t('incorrect_account_or_password'));
    }

    if (!userExists.is_verified) {
      throw createHttpError(401, {
        name: 'auth/email-not-verified',
        message: req.t('email_not_verified_exception'),
      });
    }

    const accessToken = generateToken(userObj);

    const userResult = _.omit(userObj, ['password']);

    return response(res, {
      status_code: 200,
      data: userResult,
      message: req.t('login_successfully'),
      access_token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async () => {
  try {
  } catch (error) {}
};

const getProfile = () => {};

const updateProfile = () => {};

const refreshToken = () => {};

const verifyEmail: RequestHandler<
  unknown,
  unknown,
  VerifyEmailBody,
  unknown
> = async (req, res, next) => {
  const { email, otp_code } = req.body;
  try {
    const user = await UserModel.findOne({
      where: {
        email: email,
        // otp_code: otp_code,
      },
    });

    if (!user)
      throw createHttpError(404, req.t('customer_not_found_exception'));

    if (otp_code !== user.otp_code) {
      throw createHttpError(404, req.t('invalid_otp_code_exception'));
    }

    const OTPExpired = new Date() > new Date(user.otp_expired as any);
    if (OTPExpired)
      throw createHttpError(404, req.t('otp_is_expired_exception'));

    const alreadyVerified = user.is_verified === true;

    if (alreadyVerified)
      throw createHttpError(404, req.t('email_has_been_verified_exception'));

    await user.update({ is_verified: true });

    return response(res, {
      status_code: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signUp,
  login,
  logout,
  getProfile,
  updateProfile,
  refreshToken,
  verifyEmail,
};
