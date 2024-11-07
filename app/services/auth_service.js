import { publicAxios } from "./api";

const login = (email, password) => {
  return publicAxios.post("/auth/login", {
    email,
    password,
  });
};

const signUp = (fullname, email, password) => {
  return publicAxios.post("/auth/signup", {
    fullname,
    email,
    password,
  });
};

const verifyEmail = (email, otp_code) => {
  return publicAxios.post("/auth/verify", {
    email,
    otp_code,
  });
};

export const authService = {
  login,
  signUp,
  verifyEmail,
};
