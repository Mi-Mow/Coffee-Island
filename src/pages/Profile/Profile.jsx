import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.scss";
import avatar from "../../assets/avatar.svg";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import CafeCard from "../../components/CafeCard/CafeCard";
import Snackbar from "@mui/material/Snackbar";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import EditIcon from "../../assets/profile/pen.svg";
import CheckIcon from "../../assets/profile/check.svg";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import ProductCard from "../../components/ProductCard/ProductCard";
const base = import.meta.env.BASE_URL;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { logout } = useAuth();
  // const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const [selectedSection, setSelectedSection] = useState("favorite");
  const [favoriteCafes, setFavoriteCafes] = useState(
    currentUser?.favorite.cafes || []
  );
  const [favoriteProducts, setFavoriteProducts] = useState(
    currentUser?.favorite.products || []
  );
  const [editUserName, setEditUserName] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userName
  );
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(`${base}`);

    setTimeout(() => {
      logout();
    }, 100);
  };

  const toggleFavorite = (cafe, event, type, productId) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    event.stopPropagation();
    if (isLoggedIn) {
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUser = { ...currentUser };
      if (type === "cafe") {
        const cafeExists = updatedUser.favorite.cafes.some(
          (item) => item.id === cafe.id
        );

        if (cafeExists) {
          // delete cafe
          updatedUser.favorite.cafes = updatedUser.favorite.cafes.filter(
            (item) => item.id !== cafe.id
          );
          setFavoriteCafes(updatedUser.favorite.cafes);
          setMsg("已從收藏中移除");
          setOpenSnackBar(true);
        }
      }
      if (type === "product") {
        let favoriteList = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        let updatedFavorite;
        if (favoriteList.includes(productId)) {
          updatedFavorite = favoriteList.filter(
            (id) => id !== productId
          );
          updatedUser.favorite.products = updatedUser.favorite.products.filter(
            (item) => item !== productId
          );
          setFavoriteProducts(updatedUser.favorite.products);
          setMsg("已從收藏中移除");
          setOpenSnackBar(true);
        } else {
          updatedFavorite = [...favoriteList, productId];
        }
        localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorite));
        updatedUser.favorite.products = updatedFavorite;
      }
      const updatedUsers = users.map((user) => {
        if (user.userEmail === currentUser.userEmail) {
          return {
            ...updatedUser,
          };
        }
        return user;
      });
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentUser(updatedUser); // 觸發 re-render
    } else {
      setMsg("要先登入才可以收藏哦！");
      setOpenSnackBar(true);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabName = [
    {
      zh: `咖啡店家(${favoriteCafes.length})`,
      en: `Cafes(${favoriteCafes.length})`,
    },
    {
      zh: `商品(${favoriteProducts.length})`,
      en: `Products(${favoriteProducts.length})`,
    },
    // { zh: "活動", en: "Activities" },
  ];

  const handleEditClick = () => {
    if (isEditing) {
      // TODO: 儲存新的 userName
      console.log("Saving new name:", editUserName);
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = () => {
    console.log("Change password form:", passwordForm);
    // TODO: 驗證密碼 & 更新
    setOpenPasswordDialog(false);
  };

  return (
    <>
      <div className="profile-page">
        {/* <!-- 左邊功能欄 --> */}
        <div className="sidebar">
          <div>
            <img src={avatar} alt="#" />
          </div>
          <div className="username">{currentUser.userName}</div>
          <button
            className={`${selectedSection === "favorite" ? "active" : ""
              }  button-style`}
            onClick={() => setSelectedSection("favorite")}
          >
            我的收藏
          </button>
          <button
            className={`${selectedSection === "orders" ? "active" : ""
              }  button-style`}
            onClick={() => setSelectedSection("orders")}
          >
            訂單狀態
          </button>
          <button
            className={`${selectedSection === "profile" ? "active" : ""
              }  button-style`}
            onClick={() => setSelectedSection("profile")}
          >
            會員資料
          </button>
          <button className="button-style logout-btn" onClick={handleLogout}>
            登出
          </button>
        </div>

        {/*  <!-- 右邊內容區 --> */}
        <div className="right-content">
          {/* <!-- 右中下：主內容區 --> */}
          <div className="main-section">
            {/* 我的收藏 */}
            <div className="favorite">
              {selectedSection === "favorite" && (
                <>
                  <div className="top-section">
                    <div className="favorite-item">
                      收藏店家
                      <div className="count">{favoriteCafes.length}</div>
                    </div>
                    <div className="favorite-item">
                      收藏商品
                      <div className="count">{favoriteProducts.length}</div>
                    </div>
                    {/* <div className="favorite-item">
                      收藏活動
                      <div className="count">1</div>
                    </div> */}
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{}}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                          "& .MuiTabs-indicator": {
                            backgroundColor: "#FFF0C8", // 自訂顏色
                            height: "3px", // 調整高度
                          },
                        }}
                      >
                        {tabName.map((tab, index) => (
                          <Tab
                            label={language === "zh-TW" ? tab.zh : tab.en}
                            {...a11yProps(index)}
                            key={index}
                            sx={{
                              fontFamily: "inherit",
                              fontSize: "16px",
                              color: "#d0975d",
                              "&.Mui-selected": {
                                color: "#FFF0C8",
                                "&:hover": {
                                  color: "#FFF0C8",
                                },
                              },
                              "&:hover": {
                                color: "#f3b679",
                              },
                            }}
                          />
                        ))}
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <div className="cards">
                        {favoriteCafes.length !== 0
                          ? favoriteCafes.map((cafe, index) => {
                            const isFavorite =
                              currentUser.favorite?.cafes.some(
                                (item) => item.id === cafe.id
                              );

                            return (
                              <CafeCard
                                key={index}
                                size="small"
                                title={cafe.name_zh}
                                desc={cafe.description}
                                rating={cafe.rating}
                                img={`${cafe.district_id}_${cafe?.id}_1`}
                                cafe={cafe}
                                displayFilter={[]}
                                isFavorite={isFavorite}
                                toggleFavorite={toggleFavorite}
                              />
                            );
                          })
                          : <p className="text">{t("profile.nocafes")}</p>}
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <div className="cards">
                        {favoriteProducts.length !== 0
                          ? favoriteProducts.map((id, index) => {
                            const isFavorite =
                              currentUser.favorite?.products.some(
                                (item) => item === id
                              );

                            return (
                              <ProductCard
                                key={index}
                                // size="small"
                                id={id}
                                isFavorite={isFavorite}
                                toggleFavorite={toggleFavorite}
                              />
                            );
                          })
                          : <p className="text">{t("profile.noproducts")}</p>}
                      </div>
                    </CustomTabPanel>
                    {/* <CustomTabPanel value={value} index={2}>
                    Item Three
                  </CustomTabPanel> */}
                  </Box>
                </>
              )}
            </div>
            <div>{/* 訂單狀態 */}</div>
            {/* 會員資料 */}
            <div className="profile">
              {selectedSection === "profile" && (
                <Box
                  sx={{
                    maxWidth: 500,
                    mx: "auto",
                    mt: 4,
                    p: 3,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                  }}
                >
                  {/* 會員名字欄位 */}
                  <Box display="flex" alignItems="center" mb={3}>
                    <div className="edit">
                      <TextField
                        label="會員名稱"
                        value={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}
                        disabled={!isEditing}
                        fullWidth
                      />
                      <div
                        className="edit-icon-container"
                        onClick={handleEditClick}
                      >
                        <img src={isEditing ? CheckIcon : EditIcon} alt="" />
                      </div>
                    </div>
                  </Box>

                  {/* 帳號欄位（不可編輯） */}
                  <TextField
                    label="會員帳號"
                    value={currentUser.userEmail}
                    disabled
                    fullWidth
                    sx={{ mb: 3 }}
                  />

                  {/* 修改密碼按鈕 */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenPasswordDialog(true)}
                  >
                    修改密碼
                  </Button>

                  {/* 修改密碼 Dialog */}
                  <Dialog
                    open={openPasswordDialog}
                    onClose={() => setOpenPasswordDialog(false)}
                  >
                    <DialogTitle>修改密碼</DialogTitle>
                    <DialogContent>
                      <TextField
                        name="current"
                        label="目前密碼"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={passwordForm.current}
                        onChange={handlePasswordChange}
                      />
                      <TextField
                        name="new"
                        label="新密碼"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={passwordForm.new}
                        onChange={handlePasswordChange}
                      />
                      <TextField
                        name="confirm"
                        label="確認新密碼"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={passwordForm.confirm}
                        onChange={handlePasswordChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenPasswordDialog(false)}>
                        取消
                      </Button>
                      <Button
                        onClick={handlePasswordSubmit}
                        variant="contained"
                      >
                        確認修改
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              )}
            </div>
            {/* 訂單狀況by怡璇 */}
            {selectedSection === "orders" && (
              <div className="order-section">
                <h2 className="order-title">訂單列表</h2>

                {currentUser?.orders?.length > 0 ? (
                  <div className="order-table">
                    <div className="order-header">
                      <div className="col">訂購日期</div>
                      <div className="col">訂單資料</div>
                      <div className="col">付款方式</div>
                      <div className="col">訂購總額</div>
                      <div className="col">訂單狀態</div>
                      <div className="col"></div>
                    </div>

                    {currentUser.orders.map((order, index) => (
                      <div className="order-row" key={index}>
                        <div className="col">{order.date}</div>
                        <div className="col">{order.product}</div>
                        <div className="col">{order.payment}</div>
                        <div className="col">NT$ {order.amount.toLocaleString()}</div>
                        <div className="col">{order.status}</div>
                        <div className="col">
                          <button className="order-btn">查看明細</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-orders">
                    無訂單，趕快去挑喜歡的東西吧！
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ right: { xs: 70, sm: 70 } }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#7b4519" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Profile;
