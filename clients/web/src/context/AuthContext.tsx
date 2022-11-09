import { createContext, useEffect, useState } from "react";
import React from "react";
import { login, logout, register } from "../lib/auth";

const AuthContext: React.Context<any> = React.createContext(null);

export const AuthProvider = ({ userData, children }) => {
  const [user, setUser] = useState(userData);
  console.log("AuthProvider: user: ", user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
