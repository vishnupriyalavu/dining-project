import { api } from "./api";

export const getFoods = async () => {
  const response = await api.get("/foods");
  return response.data;
};

export const getFeaturedFoods = async () => {
  const response = await api.get("/foods/featured");
  return response.data;
};