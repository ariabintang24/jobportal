import { useState } from "react";
import AuthContext from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    return !!(token && userStr);
  });

  const [loading, setLoading] = useState(false);


  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);

    window.location.href = "/";
  };

  const updateUser = (updatedUserData) => {
    const newUserData = {
      ...user,
      ...updatedUserData,
    };

    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        const userData = JSON.parse(userStr);

        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      logout();
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
