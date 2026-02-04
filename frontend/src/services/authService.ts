import api from "../lib/api";
import type { LoginFormData, SignupFormData } from "../schemas/auth";

export const signupUser = async (data: SignupFormData) => {
  const payload = {
    name: data.name,
    email: data.email,
    password: data.password, // ❌ do NOT send confirmPassword
  };

  const res = await api.post("/auth/signup", payload);
  return res.data;
};

export const loginUser = async (data: LoginFormData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
