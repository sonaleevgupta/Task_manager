import { apiClient } from "./client";

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post("/api/v1/auth/login", data);
    return response.data;
  },
  signup: async (data: any) => {
    const response = await apiClient.post("/api/v1/auth/signup", data);
    return response.data;
  },
};
