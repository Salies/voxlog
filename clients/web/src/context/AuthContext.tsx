import { createContext, useEffect, useState } from "react";
import React from "react";

// store token in a secure cookie
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "../lib/axios";
import Router from "next/router";

interface UserProps {
  username: string;
  email: string;
  name: string;
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

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const { token } = response.data;
      setCookie(undefined, "jwt.token", token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      setToken(token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    destroyCookie(undefined, "jwt.token");
    setToken(null);
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      api
        .get("/current")
        .then((response) => {
          const { username, email, name } = response.data;
          setUser({ username, email, name });
          Router.push(`users/${username}`);
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
