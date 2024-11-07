import { authAxios, publicAxios } from "./api";

const getProducts = () => {
  return publicAxios.get("/products");
};

const getProduct = (id) => {
  return publicAxios.get(`/products/${id}`);
};

const searchProduct = (search) => {
  return publicAxios.get(`products`, {
    params: {
      search,
    },
  });
};

const createProduct = ({
  name,
  description,
  import_price,
  price,
  promotional_price,
  quantity,
  image,
}) => {
  return authAxios.post("products", {
    name,
    description,
    import_price,
    price,
    promotional_price,
    quantity,
    image,
  });
};

export const productService = {
  getProducts,
  getProduct,
  searchProduct,
  createProduct,
};
