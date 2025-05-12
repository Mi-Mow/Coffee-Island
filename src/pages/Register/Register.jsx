import { useAuth } from '../../context/AuthContext';
import './Register.scss';


function Register() {
    const { login } = useAuth();
    return (
        <div className="login-wrapper">
            <div className="login-card">
                <p className="sub-title">會員註冊</p>
                <h2 className="main-title">免費加入</h2>

                <label className="input-label" htmlFor="email">設定帳號*</label>
                <input className="register-input" type="email" id="email" placeholder="請輸入電子郵件" required />

                <label className="input-label" htmlFor="password">確認帳號*</label>
                <input className="register-input" type="password" id="confirm-email" placeholder="請再輸入一次電子郵件" required />

                <label className="input-label" htmlFor="password">設定密碼*</label>
                <input className="register-input" type="password" id="password" placeholder="請輸入密碼" required />

                <label className="input-label" htmlFor="password">確認密碼*</label>
                <input className="register-input" type="password" id="confirm-password" placeholder="請再輸入一次密碼" required />

                <div className="options">
                    <label className="remember">
                        <input type="checkbox" />
                        記住密碼
                    </label>
                </div>

                <button className="login-btn" onClick={login}>註冊</button>
            </div>
        </div>
    );

}
export default Register