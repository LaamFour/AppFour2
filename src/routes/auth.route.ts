import { Router } from 'express';
import { authController } from '~/controllers';
import { validate } from '~/middlewares';
import { loginSchema, signUpSchema, verifyEmailSchema } from '~/schemas';

const authRoute = Router();

authRoute.post('/auth/signup', validate(signUpSchema), authController.signUp);

authRoute.post('/auth/login', validate(loginSchema), authController.login);

authRoute.post('/auth/logout', authController.logout);

authRoute.get('/auth/profile', authController.getProfile);

authRoute.patch('/auth/profile', authController.updateProfile);

authRoute.post('/auth/refresh-token', authController.refreshToken);

authRoute.post(
  '/auth/verify',
  validate(verifyEmailSchema),
  authController.verifyEmail,
);

export default authRoute;
