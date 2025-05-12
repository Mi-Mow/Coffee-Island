import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    navigate("/");
  };
  const logout = () => {
    navigate("/");
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
