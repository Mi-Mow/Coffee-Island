import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import eyes from "../../assets/register/eyes.png";
import eyelashes from "../../assets/register/eyelashes.png";
import "./Register.scss";

function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = (name, email, password, confirmPassword) => {
    if (!name) {
      setErrMsg("請輸入您的名字");
      setOpenSnackBar(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 常用 email 格式檢查 regex
    if (!emailRegex.test(email)) {
      setErrMsg("請輸入有效的電子郵件格式");
      setOpenSnackBar(true);
      return;
    }
    // 檢核密碼長度
    if (password.length < 6) {
      setErrMsg("密碼長度須為6碼以上");
      setOpenSnackBar(true);
      return;
    }
    // 密碼與確認密碼
    if (password !== confirmPassword) {
      setErrMsg("設定密碼與確認密碼不一致");
      setOpenSnackBar(true);
      return;
    }

    return true;
  };

  const handleRegister = () => {
    const validateResult = validate(name, email, password, confirmPassword);
    if (validateResult) {
      const result = register(name, email, password);
      if (!result.success) {
        setErrMsg(result.message);
        setOpenSnackBar(true);
      }
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
          <p className="sub-title">會員註冊</p>
          <h2 className="main-title">免費加入</h2>
          <div className="input-item">
            <label className="input-label" htmlFor="name">
              您的名字*
            </label>
            <input
              className="register-input"
              type="name"
              id="name"
              placeholder="請輸入您的名字"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-item">
            <label className="input-label" htmlFor="email">
              設定帳號*
            </label>
            <input
              className="register-input"
              type="email"
              id="email"
              placeholder="請輸入電子郵件"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-item">
            <label className="input-label" htmlFor="password">
              設定密碼*
            </label>
            <div className="password">
              <input
                className="register-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="請輸入密碼，長度需6碼以上"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <div
                className="eyes-container"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src={showPassword ? eyes : eyelashes} alt="" />
              </div>
            </div>
          </div>
          <div className="input-item">
            <label className="input-label" htmlFor="password">
              確認密碼*
            </label>
            <div className="password">
              <input
                className="register-input"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="請再輸入一次密碼"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
              <div
                className="eyes-container"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <img src={showConfirmPassword ? eyes : eyelashes} alt="" />
              </div>
            </div>
          </div>

          <button className="register-btn" onClick={handleRegister}>
            註冊
          </button>
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
          severity="warning"
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: "#A46230",
          }}
        >
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Register;
