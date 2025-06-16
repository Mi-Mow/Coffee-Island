import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import eyes from "../../assets/register/eyes.png";
import eyelashes from "../../assets/register/eyelashes.png";
import monsterImg from "../../assets/home/monster-l.svg";
import { useTranslation } from "react-i18next";



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

  const [openForgotDialog, setOpenForgotDialog] = useState(false);
  const [openForgotSnackbar, setOpenForgotSnackbar] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const { t } = useTranslation();



  const handleLogin = () => {
    if (!email || !password) {
      setMsg("帳號跟密碼都要輸入哦");
      setOpenSnackBar(true);
    } else {
      const result = login(email, password);
      setIsLogin(result.success);
      setMsg(result.message);
      setOpenSnackBar(true);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") return;
    setOpenSnackBar(false);
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-card">
          <p className="sub-title">{t("login.title")}</p>
          <h2 className="main-title">{t("login.welcome")}</h2>

          <div className="input-item">
            <label className="input-label" htmlFor="email">{t("login.email")}</label>
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
            <label className="input-label" htmlFor="password">{t("login.password")}</label>
            <div className="password">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="eyes-container" onClick={() => setShowPassword((prev) => !prev)}>
                <img src={showPassword ? eyes : eyelashes} alt="toggle visibility" />
              </div>
            </div>
          </div>

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              {t("login.remember")}
            </label>
            <a
              className="link1"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpenForgotDialog(true);
              }}
            >
              {t("login.forgot")}
            </a>
          </div>


          <button className="login-btn" onClick={handleLogin}>登入</button>

          <div className="footer">
            <p>{t("login.notMember")}</p>
            <p className="link2">{t("login.registerNow")}</p>
          </div>
        </div>
      </div>

      {/* 登入錯誤/成功提示 */}
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

      {/* 忘記密碼 Dialog（by怡璇） */}
      <Dialog
        open={openForgotDialog}
        onClose={() => setOpenForgotDialog(false)}
        slotProps={{
          paper: {
            component: "form",
            sx: {
              backgroundColor: "#184f42",
              color: "#fff1cb",
              fontFamily: "Noto Serif TC",
            },
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get("email");
              console.log("重設密碼信已寄出：", email);
              setOpenForgotDialog(false);
              setShowSuccessBox(true);
            },
          },
        }}
      >
        <DialogTitle sx={{ color: "#ffffff" }}>{t("login.forgot")}</DialogTitle>
        <DialogContent>
          <DialogContentText
          sx={{color:"#fff1cb"}}
          >{t("forgot.instruction")}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="forgot-email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            InputLabelProps={{ sx: { color: "#fff1cb" } }}
            InputProps={{
              sx: {
                color: "#fff1cb",
                "&:before": {
                  borderBottom: "1px solid #fff1cb",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "1px solid #fff1cb",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgotDialog(false)} sx={{ color: "#fff1cb" }}>
            {t("forgot.cancel")}
          </Button>
          <Button type="submit" sx={{ color: "#184f42", backgroundColor: "#fff1cb" }}>
            {t("forgot.send")}
          </Button>
        </DialogActions>
      </Dialog>
      <div></div>
      {showSuccessBox && (
        <div className="email-success-popup">
          <img src={monsterImg} alt="monster" className="monster-img" />
          <p className="popup-message">{t("forgot.success")}</p>
          <button
            className="popup-btn"
            onClick={() => setShowSuccessBox(false)}
          >
            {t("forgot.ok")}
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
