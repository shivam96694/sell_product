import api from "./api";

export const getAllProducts = () => api.get("/products");

export const getSingleProduct = (id) => api.get(`/products/${id}`);

export const getMyProducts = () => api.get("/products/my");

export const deleteProduct = (id) => api.delete(`/products/${id}`);

