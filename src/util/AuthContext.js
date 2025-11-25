import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser && storedUser !== 'undefined') {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Ошибка парсинга из localStorage');
        return null;
      }
    }
    return null;
  };

  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(getInitialUser());
  const isAuthenticated = !!token;

  const register = async (email, password, username) => {
    try {
      const response = await fetch('https://a57e29c422a5fd0e.mokky.dev/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username })
      });
      const data = await response.json();

      if (response.ok) {
        loginSuccess(data.data, data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Ошибка регистрации' };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка со связью' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('https://a57e29c422a5fd0e.mokky.dev/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        loginSuccess(data.data, data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Ошибка авторизации' };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка со связью' };
    }
  };

  const loginSuccess = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('authToken', userToken);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const value = {
    isAuthenticated,
    user,
    token,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
