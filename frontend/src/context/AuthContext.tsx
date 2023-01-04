import { createContext, useEffect, useState } from 'react';
import React from 'react';

// store token in a secure cookie
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import api from '../lib/axios';
import Router, { useRouter } from 'next/router';
import { parse, stringify } from 'superjson';
import { UserDTO } from '../utils/dtos/User';
import { DateTime } from 'luxon';

interface AuthContextProps {
  user: UserDTO | null;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState({} as UserDTO | null);
  const [error, setError] = useState();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const { 'jwt.lastLogin': lastLogin } = parseCookies();
    if (lastLogin) {
      const parsedLastLogin = parse(lastLogin);
      const userLastLogin: DateTime = DateTime.fromJSDate(parsedLastLogin);
      const diffInDays = userLastLogin.diffNow('days').days;
      if (diffInDays > 30) logout();
    } else {
      logout();
    }

    const { 'jwt.token': token } = parseCookies();
    const userData = localStorage.getItem('user');

    if (token) setToken(token);

    if (userData) setUser(parse(userData) as UserDTO);

    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const body = { username, password };
      const { data } = await api.post('/login', body);
      const { token } = data;

      setCookie(undefined, 'jwt.token', token, { maxAge: 60 * 60 * 24 * 30 });
      setToken(token);
      getUser(token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (token: string) => {
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      setLoading(true);
      api
        .get('/users/current')
        .then((response) => {
          const user: UserDTO = parse(response.data) as UserDTO;
          setUser(user);
          localStorage.setItem('user', stringify(user));
          // store the time the user logged in
          setCookie(undefined, 'jwt.lastLogin', stringify(Date.now()), {
            maxAge: 60 * 60 * 24 * 30,
          });
        })

        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const logout = async () => {
    destroyCookie(undefined, 'jwt.token');
    destroyCookie(undefined, 'jwt.lastLogin');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};