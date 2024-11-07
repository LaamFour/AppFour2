import * as yup from 'yup';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '~/constants';
import i18n from '~/i18n';

export type SignUpBody = yup.InferType<typeof signUpSchema>['body'];
export type LoginBody = yup.InferType<typeof loginSchema>['body'];

export type VerifyEmailBody = yup.InferType<typeof verifyEmailSchema>['body'];

export const signUpSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email(i18n.t('invalid_email'))
      .required(i18n.t('email_required')),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH, i18n.t('password_required'))
      .max(MAX_PASSWORD_LENGTH)
      .required(i18n.t('password_required')),
    fullname: yup.string().required(),
  }),
});

export const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email(i18n.t('invalid_email'))
      .required(i18n.t('email_required')),
    password: yup
      .string()
      .min(MIN_PASSWORD_LENGTH, i18n.t('min_password_length'))
      .max(MAX_PASSWORD_LENGTH, i18n.t('max_password_length'))
      .required(i18n.t('password_required')),
  }),
});

export const updateProfileSchema = yup.object({});

export const verifyEmailSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email(i18n.t('invalid_email'))
      .required(i18n.t('email_required')),
    otp_code: yup.string().required(),
  }),
});
