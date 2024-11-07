import { authAxios } from "./api";

const createAddress = ({
  fullname,
  phone_number,
  is_default,
  specific_address,
  latitude,
  longitude,
}) => {
  return authAxios.post("/addresses", {
    fullname,
    phone_number,
    is_default,
    specific_address,
    latitude,
    longitude,
  });
};

const getAddresses = () => {
  return authAxios.get("/addresses");
};

export const addressService = {
  createAddress,
  getAddresses,
};
