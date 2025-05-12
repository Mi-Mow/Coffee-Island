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
      <div className="profile-page">
        <button className="logout-btn" onClick={handleLogout}>
          登出
        </button>
      </div>
    </>
  );
}

export default Profile;
