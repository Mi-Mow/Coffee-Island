import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.scss";

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
      <div class="profile-page">
        {/* <!-- 左邊功能欄 --> */}
        <div class="sidebar">
          <div><img src="" alt="#" /></div>
          <div class="username">王大明</div>
          <button class="button-style">我的收藏</button>
          <button class="button-style">訂單狀態</button>
          <button class="button-style">瀏覽紀錄</button>
          <button class="button-style" onClick={handleLogout}>登出</button>
        </div>

        {/*  <!-- 右邊內容區 --> */}
        <div class="right-content">
          {/*  <!-- 右上 --> */}
          <div class="top-section">
            <div class="favorite-item">
              收藏店家
              <div class="count">8</div>
            </div>
            <div class="favorite-item">
              收藏商品
              <div class="count">2</div>
            </div>
            <div class="favorite-item">
              收藏活動
              <div class="count">1</div>
            </div>
          </div>

          {/* <!-- 右中下：主內容區 --> */}
          <div class="main-section">
            <div class="count">
              <div class="count-item">
                <span>咖啡店家 (8)</span>

              </div>
              <div class="count-item">
                <span>商品 (2)</span>

              </div>
              <div class="count-item">
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
