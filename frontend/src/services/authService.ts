import axios from "axios"

import { api } from "./api"

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
}

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message

    if (typeof message === "string" && message.trim()) {
      return message
    }
  }

  return fallbackMessage
}

export const loginUser = async (data: LoginPayload) => {
  try {
    const response = await api.post("/auth/login", data)
    return response.data as { token: string }
  } catch (error) {
    throw new Error(getErrorMessage(error, "Login failed"))
  }
}

export const registerUser = async (data: RegisterPayload) => {
  try {
    const response = await api.post("/auth/register", data)
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error, "Registration failed"))
  }
}
