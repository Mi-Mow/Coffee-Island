import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import eyes from "../../assets/register/eyes.png";
import eyelashes from "../../assets/register/eyelashes.png";
const base = import.meta.env.BASE_URL;

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setMsg("帳號跟密碼都要輸入哦");
      setOpenSnackBar(true);
    } else {
      const result = login(email, password);
      if (!result.success) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
      setMsg(result.message);
      setOpenSnackBar(true);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          <p className="sub-title">會員登入</p>
          <h2 className="main-title">歡迎回來</h2>

          <div className="input-item">
            <label className="input-label" htmlFor="email">
              帳號*
            </label>
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="請輸入電子郵件"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-item">
            <label className="input-label" htmlFor="password">
              密碼*
            </label>
            <div className="password">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="eyes-container"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src={showPassword ? eyes : eyelashes} alt="" />
              </div>
            </div>
          </div>
          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              記住密碼
            </label>
            <a className="link1" href="#">
              忘記密碼？
            </a>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            登入
          </button>

          <div className="footer">
            <p>還不是會員？</p>
            <p
              className="link2"
              onClick={() => {
                navigate(`${base}register`);
              }}
            >
              立即註冊
            </p>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ right: { xs: 70, sm: 70 } }}
      >
        <Alert
          onClose={handleClose}
          severity={isLogin ? "success" : "warning"}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: isLogin ? "#0a7e5d" : "#A46230",
          }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
