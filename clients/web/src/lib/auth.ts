// Auth Lib - Connects with the backend to authenticate users
// and store their JWT in a secure cookie
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import api from "./axios";
import { UserCreateDTO } from "../utils/dtos/UserCreateDTO";

export const login = async (username: string, password: string) => {
  const response = await api.post("/login", { username, password });

  setCookie(null, "token", response.data.token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
  return response.data.token;
};

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  setCookie({ res }, "token", "", {
    maxAge: -1,
    path: "/",
  });
};

export const getCurrentUser = async (req: NextApiRequest) => {
  const token = req.cookies.token;
  if (!token) return null;

  const response = await api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAuthHeader = (req: NextApiRequest) => {
  const token = req.cookies.token;
  if (!token) return null;

  return { Authorization: `Bearer ${token}` };
};

export const register = async (user: UserCreateDTO) => {
  const response = await api.post("/register", user);
  setCookie(null, "token", response.data.token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};
