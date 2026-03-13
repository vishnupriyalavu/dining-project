import axios from "axios";

import { api } from "./api";

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage
  }

  return fallbackMessage
}

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Login failed"))
  }
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Registration failed"))
  }
};
