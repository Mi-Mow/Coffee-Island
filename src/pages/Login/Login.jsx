import { useAuth } from "../../context/AuthContext";
import "./Login.scss"

function Login() {
  const { login } = useAuth();

    return (
        <>
               <div className="login-wrapper">
      <div className="login-card">
        <p className="sub-title">會員登入</p>
        <h2 className="main-title">歡迎回來</h2>

        <label className="input-label" htmlFor="email">帳號*</label>
        <input className="login-input" type="email" id="email" placeholder="請輸入電子郵件" />

        <label className="input-label" htmlFor="password">密碼*</label>
        <input className="login-input" type="password" id="password" placeholder="請輸入密碼" />

        <div className="options">
          <label className="remember">
            <input type="checkbox" />
            記住密碼
          </label>
          <a className="link1" href="#">忘記密碼？</a>
        </div>

        <button className="login-btn" onClick={login}>登入</button>

        <div className="footer">
          <p>還不是會員？</p>
          <a className="link2" href="#">立即註冊</a>
        </div>
      </div>
    </div>
        </>
    );
}

export default Login