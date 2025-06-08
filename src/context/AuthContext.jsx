import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const base = import.meta.env.BASE_URL;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const navigate = useNavigate();
  const admin = [
    {
      userName: "曾郝丸",
      userEmail: "admin@email.com",
      userPassword: btoa("qazwsx"),
      favorite: {
        cafes: [],
        products: [],
      },
    },
  ];
  const users = JSON.parse(localStorage.getItem("users")) || [...admin];
  localStorage.setItem("users", JSON.stringify(users));

  const login = (email, password) => {
    console.log("users", users);
    const user = users.find((user) => user.userEmail === email);
    if (user) {
      console.log("user exist");
      if (atob(user.userPassword) === password) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate(localStorage.getItem("currentPath"));
        setSnackbarMsg(`${user.userName}，歡迎回來！`);
        setTimeout(() => {
          setSnackbarMsg(""); // 自動清除
        }, 4200);
        return { success: true, message: `${user.userName}，歡迎回來！` };
      } else {
        // password is wrong
        return { success: false, message: "輸入密碼不正確" };
      }
    } else {
      console.log("user doesn't exist");
      return { success: false, message: "此帳號不存在，請註冊加入我們！" };
    }
  };

  const register = (name, email, password) => {
    console.log("users", users);
    const user = users.find((user) => user.userEmail === email);
    if (user) {
      console.log("user exist");
      return { success: false, message: "此帳號已經註冊過了，請前往登入呦！" };
    } else {
      const newUser = {
        userName: name,
        userEmail: email,
        userPassword: btoa(password),
        favorite: {
          cafes: [],
          products: [],
        },
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      navigate(localStorage.getItem("currentPath"));
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      setSnackbarMsg(`${name}，歡迎加入！`);
      setTimeout(() => {
        setSnackbarMsg(""); // 自動清除
      }, 4200);
      return { success: true, message: `${name}，歡迎加入！` };
    }
  };

  const logout = () => {
    setSnackbarMsg("登出成功，下次見哦");
    setTimeout(() => {
      setSnackbarMsg(""); // 自動清除
    }, 4200);
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate(`${base}`);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, register, logout, snackbarMsg }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
