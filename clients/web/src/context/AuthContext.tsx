import { createContext, useEffect, useState } from "react";
import React from "react";

// store token in a secure cookie
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "../lib/axios";
import Router from "next/router";

interface UserProps {
  username: string;
  profilePictureUrl?: string;
  bio?: string;
  realName?: string;
  createdAt: string;
}

interface AuthContextProps {
  user: UserProps | null;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as UserProps | null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const { "jwt.token": token } = parseCookies();
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      const { token } = response.data;
      setCookie(undefined, "jwt.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setToken(token);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    destroyCookie(undefined, "jwt.token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setLoading(true);
      api
        .get("/users/current")
        .then((response) => {
          const { username, profilePictureUrl, bio, realName, createdAt } =
            response.data;
          setUser({
            username,
            profilePictureUrl,
            bio,
            realName,
            createdAt,
          });
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      Router.push("/404");
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
