import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import eyes from "../../assets/register/eyes.png";
import eyelashes from "../../assets/register/eyelashes.png";
import "./Register.scss";
import { useTranslation } from "react-i18next";


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
  const { t } = useTranslation();

  const validate = (name, email, password, confirmPassword) => {
    if (!name) {
      setErrMsg(t("register.error.nameRequired"));
      setOpenSnackBar(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrMsg(t("register.error.invalidEmail"));
      setOpenSnackBar(true);
      return;
    }

    if (password.length < 6) {
      setErrMsg(t("register.error.passwordTooShort"));
      setOpenSnackBar(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrMsg(t("register.error.passwordMismatch"));
      setOpenSnackBar(true);
      return;
    }
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
          <p className="sub-title">{t("register.title")}</p>
          <h2 className="main-title">{t("register.subtitle")}</h2>

          <div className="input-item">
            <label className="input-label" htmlFor="name">{t("register.name")}</label>
            <input
              className="register-input"
              type="text"
              id="name"
              placeholder={t("register.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-item">
            <label className="input-label" htmlFor="email">{t("register.email")}</label>
            <input
              className="register-input"
              type="email"
              id="email"
              placeholder={t("register.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-item">
            <label className="input-label" htmlFor="password">{t("register.password")}</label>
            <div className="password">
              <input
                className="register-input"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("register.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <label className="input-label" htmlFor="confirm-password">{t("register.confirmPassword")}</label>
            <div className="password">
              <input
                className="register-input"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder={t("register.confirmPasswordPlaceholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {t("register.button")}
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
