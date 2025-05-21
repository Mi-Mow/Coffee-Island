import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.scss";
import avatar from '../../assets/avatar.svg'

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');

    setTimeout(() => {
      logout();
    }, 100);
  }

  return (
    <>
      <div className="profile-page">
        {/* <!-- 左邊功能欄 --> */}
        <div className="sidebar">
          <div><img src={avatar} alt="#" /></div>
          <div className="username">王大明</div>
          <button className="button-style">我的收藏</button>
          <button className="button-style">訂單狀態</button>
          <button className="button-style">瀏覽紀錄</button>
          <button className="button-style" onClick={handleLogout}>登出</button>
        </div>

        {/*  <!-- 右邊內容區 --> */}
        <div className="right-content">
          {/*  <!-- 右上 --> */}
          <div className="top-section">
            <div className="favorite-item">
              收藏店家
              <div className="count">8</div>
            </div>
            <div className="favorite-item">
              收藏商品
              <div className="count">2</div>
            </div>
            <div className="favorite-item">
              收藏活動
              <div className="count">1</div>
            </div>
          </div>

          {/* <!-- 右中下：主內容區 --> */}
          <div className="main-section">
            <div className="count">
              <div className="count-item">
                <span>咖啡店家 (8)</span>

              </div>
              <div className="count-item">
                <span>商品 (2)</span>

              </div>
              <div className="count-item">
                <span>活動 (1)</span>

              </div>
            </div>
            {/* <!-- 可以在這裡接續主內容卡片、收藏項目等 --> */}
          </div>
          
        </div>
      </div>

    </>
  );
}

export default Profile;
