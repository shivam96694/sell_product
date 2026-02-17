import api from "./api";

export const getAllProducts = () => api.get("/products");

export const getSingleProduct = (id) => api.get(`/products/${id}`);