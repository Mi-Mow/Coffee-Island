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
  InputAdornment,
} from "@mui/material";

import EditIcon from "../../assets/profile/pen.svg";
import CheckIcon from "../../assets/profile/check.svg";
import eyes from "../../assets/register/eyes.png";
import eyelashes from "../../assets/register/eyelashes.png";
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
  const [selectedSection, setSelectedSection] = useState(
    window.innerWidth > 430 ? "favorite" : ""
  );
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

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showContent, setShowContent] = useState(false);

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
          setMsg(t("snackbar.remove"));
          setOpenSnackBar(true);
        }
      }
      if (type === "product") {
        let favoriteList =
          JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        let updatedFavorite;
        if (favoriteList.includes(productId)) {
          updatedFavorite = favoriteList.filter((id) => id !== productId);
          updatedUser.favorite.products = updatedUser.favorite.products.filter(
            (item) => item !== productId
          );
          setFavoriteProducts(updatedUser.favorite.products);
          setMsg(t("snackbar.remove"));
          setOpenSnackBar(true);
        } else {
          updatedFavorite = [...favoriteList, productId];
        }
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(updatedFavorite)
        );
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
      setMsg(t("snackbar.loginToAdd"));
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
      if (editUserName !== currentUser.userName) {
        const updatedUser = { ...currentUser };
        const users = JSON.parse(localStorage.getItem("users"));

        updatedUser.userName = editUserName;
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
        setCurrentUser(updatedUser);
        setMsg(t("snackbar.usernameUpdated"));
        setOpenSnackBar(true);
      }
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setMsg(t("snackbar.fillAllFields"));
      setOpenSnackBar(true);
      return;
    } else {
      const updatedUser = { ...currentUser };

      if (atob(updatedUser.userPassword) === passwordForm.current) {
        //
        if (passwordForm.new.length < 6) {
          setMsg(t("snackbar.newPasswordLength"));
          setOpenSnackBar(true);
          return;
        } else {
          if (passwordForm.new !== passwordForm.confirm) {
            setMsg(t("snackbar.passwordsNotMatch"));
            setOpenSnackBar(true);
            return;
          } else if (passwordForm.new === atob(updatedUser.userPassword)) {
            setMsg(t("snackbar.newOldPassword"));
            setOpenSnackBar(true);
            return;
          } else {
            updatedUser.userPassword = btoa(passwordForm.new);

            const users = JSON.parse(localStorage.getItem("users"));
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
            setOpenPasswordDialog(false);
            setMsg(t("snackbar.newOldPassword"));
            setOpenSnackBar(true);
            setPasswordForm({
              current: "",
              new: "",
              confirm: "",
            });
          }
        }
      } else {
        setMsg(t("snackbar.currentPasswordWrong"));
        setOpenSnackBar(true);
        return;
      }
    }
  };

  const closePasswordDialog = () => {
    setPasswordForm({
      current: "",
      new: "",
      confirm: "",
    });
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setOpenPasswordDialog(false);
  };

  return (
    <>
      <div className="profile-page">
        <div className={`${selectedSection !== "" ? "hide" : ""} sidebar`}>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
          <div className="username">{currentUser.userName}</div>
          <button
            className={`${
              selectedSection === "favorite" ? "active" : ""
            } button-style`}
            onClick={() => {
              setSelectedSection("favorite");
              setShowContent(true);
              setShowMenu(false);
            }}
          >
            {t("profile.sidebar.favorites")}
          </button>
          <button
            className={`${
              selectedSection === "orders" ? "active" : ""
            } button-style`}
            onClick={() => {
              setSelectedSection("orders");
              setShowContent(true);
            }}
          >
            {t("profile.sidebar.orders")}
          </button>
          <button
            className={`${
              selectedSection === "profile" ? "active" : ""
            } button-style`}
            onClick={() => {
              setSelectedSection("profile");
              setShowContent(true);
            }}
          >
            {t("profile.sidebar.profile")}
          </button>
          <button className="button-style logout-btn" onClick={handleLogout}>
            {t("profile.sidebar.logout")}
          </button>
        </div>
        {/* ); */}

        {/*  <!-- 右邊內容區 --> */}
        <div className={`right-content ${showContent ? "active" : ""}`}>
          {/* <!-- 右中下：主內容區 --> */}
          <div className="main-section">
            {/* 我的收藏 */}
            <div className="favorite">
              {selectedSection === "favorite" && (
                <>
                  <div className="top-section">
                    <div className="title">
                      {t("profile.sidebar.favorites")}
                    </div>
                    <div className="favorite-items">
                      <div className="favorite-item">
                        {t("profile.favoriteCafes")}
                        <div className="count">{favoriteCafes.length}</div>
                      </div>
                      <div className="favorite-item">
                        {t("profile.favoriteProducts")}
                        <div className="count">{favoriteProducts.length}</div>
                      </div>
                      {/* <div className="favorite-item">
                      收藏活動
                      <div className="count">1</div>
                    </div> */}
                    </div>
                  </div>
                  <Box sx={{ width: "100%", pt: 2 }}>
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
                        {favoriteCafes.length !== 0 ? (
                          favoriteCafes.map((cafe, index) => {
                            const isFavorite = currentUser.favorite?.cafes.some(
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
                        ) : (
                          <p className="text">{t("profile.nocafes")}</p>
                        )}
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <div className="cards">
                        {favoriteProducts.length !== 0 ? (
                          favoriteProducts.map((id, index) => {
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
                        ) : (
                          <p className="text">{t("profile.noproducts")}</p>
                        )}
                      </div>
                    </CustomTabPanel>
                  </Box>
                </>
              )}
            </div>
            {/* 訂單狀態by怡璇 */}
            {selectedSection === "orders" && (
              <div className="order-section">
                <h2 className="order-title">{t("profile.order.title")}</h2>

                {currentUser?.orders?.length > 0 ? (
                  <div className="order-table">
                    <div className="order-header">
                      <div className="col">{t("profile.order.date")}</div>
                      <div className="col">{t("profile.order.info")}</div>
                      <div className="col">{t("profile.order.payment")}</div>
                      <div className="col">{t("profile.order.total")}</div>
                      <div className="col">{t("profile.order.status")}</div>
                      <div className="col"></div>
                    </div>

                    {currentUser.orders.map((order, index) => {
                      const productList = order.productList || [];
                      const productCount = productList.length;
                      const firstProductName =
                        productCount > 0
                          ? language === "zh-TW"
                            ? productList[0].nameZH
                            : productList[0].nameEN
                          : "";

                      return (
                        <div className="order-row" key={index}>
                          <div className="col">{order.date}</div>
                          <div className="col">
                            {productCount > 1
                              ? t("profile.order.productSummary", {
                                  name: firstProductName,
                                  count: productCount,
                                })
                              : firstProductName}
                          </div>
                          <div className="col">
                            {t(
                              `cart.payment.${
                                order.payment === "取貨付款"
                                  ? "cod"
                                  : "transfer"
                              }`
                            )}
                          </div>
                          <div className="col">
                            NT$ {order.amount.toLocaleString()}
                          </div>
                          <div className="col">
                            {t(`profile.orderStatus.${order.status}`)}
                          </div>
                          <div className="col">
                            <button className="order-btn">
                              {t("profile.order.detailBtn")}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-orders">{t("profile.order.empty")}</div>
                )}
              </div>
            )}
            {/* 會員資料 */}
            <div className="profile">
              {selectedSection === "profile" && (
                <>
                  <div className="profile-title">
                    {t("profile.sidebar.profile")}
                  </div>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      mx: "auto",
                      mt: 4,
                      py: 2,
                      "@media (max-width: 430px)": {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }
                    }}
                  >
                    {/* 會員名字欄位 */}
                    <Box alignItems="center" mb={3} sx={{
                      width: "100%"
                    }}>
                      <div className="edit">
                        <TextField
                          label={language === "zh-TW" ? "會員名稱" : "Name"}
                          //"會員名稱"
                          value={editUserName}
                          onChange={(e) => setEditUserName(e.target.value)}
                          disabled={!isEditing}
                          // fullWidth
                          InputLabelProps={{
                            sx: {
                              color: "#fff",
                              zIndex: 1,
                              fontSize: "16px",
                              fontFamily: "Noto Serif TC",
                              "&.Mui-disabled": {
                                color: "#fff1cb",
                              },
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleEditClick}
                                  edge="end"
                                >
                                  <img
                                    src={isEditing ? CheckIcon : EditIcon}
                                    alt="edit"
                                    style={{ width: 40, height: 40 }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              fontFamily: "Noto Serif TC",
                              "& .MuiInputBase-input": {
                                color: "#fff1cb",
                                "&.Mui-disabled": {
                                  WebkitTextFillColor:
                                    "rgba(255, 241, 203, 0.75)", // disabled 時文字顏色
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff1cb",
                              },
                            },
                          }}
                          sx={{
                            width: {
                              xs: "100%", // < 600px
                              sm: "55%", // > 600px
                            },
                            minWidth: "250px",
                            // border: "3px solid #fff1cb",
                            "& label.Mui-focused": {
                              color: "#fff1cb",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff1cb",
                                color: "#fff1cb",
                              },
                              "&:hover fieldset": {
                                borderColor: "#ffe580",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff1cb",
                              },
                              "&.Mui-disabled fieldset": {
                                borderColor: "rgba(255, 241, 203, 0.75)",
                              },
                            },
                          }}
                        />
                      </div>
                    </Box>

                    <TextField
                      label={language === "zh-TW" ? "會員帳號" : "Account"}
                      value={currentUser.userEmail}
                      disabled
                      // fullWidth
                      InputLabelProps={{
                        sx: {
                          color: "#fff",
                          zIndex: 1,
                          fontSize: "16px",
                          fontFamily: "Noto Serif TC",
                          "&.Mui-disabled": {
                            color: "#fff1cb",
                          },
                        },
                      }}
                      InputProps={{
                        sx: {
                          fontFamily: "Noto Serif TC",
                          "& .MuiInputBase-input": {
                            color: "#fff1cb",
                            "&.Mui-disabled": {
                              WebkitTextFillColor: "rgba(255, 241, 203, 0.75)", // disabled 時文字顏色
                            },
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff1cb",
                          },
                        },
                      }}
                      sx={{
                        width: {
                          xs: "100%", // < 600px
                          sm: "55%", // > 600px
                        },
                        minWidth: "250px",
                        mb: 3,
                        "& label.Mui-focused": {
                          color: "#fff1cb",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#fff1cb",
                            color: "#fff1cb",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ffe580",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#fff1cb",
                          },
                          "&.Mui-disabled fieldset": {
                            borderColor: "rgba(255, 241, 203, 0.75)",
                          },
                        },
                      }}
                    />
                    {/* <br/> */}

                    {/* 修改密碼按鈕 */}
                    <Button
                      // variant="contained"
                      onClick={() => setOpenPasswordDialog(true)}
                      sx={{
                        display: "block",
                        backgroundColor: "#fbce97",
                        color: "#684412",
                        border: "#684412 2px solid",
                        borderRadius: "2px",
                        width: "150px",
                        fontFamily: "Noto Serif TC",
                        fontWeight: "600",
                        fontSize: "16px",
                        textTransform: "none",
                        lineHeight: "1.3",
                        "&:hover": {
                          backgroundColor: "#fddeb8",
                        },
                      }}
                    >
                      {t("profile.profileInfo.changePassword")}
                    </Button>

                    {/* 修改密碼 Dialog */}
                    <Dialog
                      open={openPasswordDialog}
                      onClose={closePasswordDialog}
                    >
                      <DialogTitle
                        sx={{
                          backgroundColor: "#184f42",
                          color: "#fff1cb",
                          fontFamily: "Noto Serif TC",
                          fontSize: "30px",
                        }}
                      >
                        {t("profile.profileInfo.changePassword")}
                      </DialogTitle>
                      <DialogContent
                        sx={{
                          backgroundColor: "#184f42",
                          py: 1,
                        }}
                      >
                        <TextField
                          name="current"
                          label={
                            language === "zh-TW"
                              ? "目前密碼"
                              : "Current Password"
                          }
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          margin="dense"
                          value={passwordForm.current}
                          onChange={handlePasswordChange}
                          InputLabelProps={{
                            sx: {
                              color: "rgba(255,255,255,0.8)",
                              zIndex: 1,
                              fontSize: "16px",
                              fontFamily: "Noto Serif TC",
                              "&.Mui-disabled": {
                                color: "#ffd39d",
                              },
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                  edge="end"
                                  sx={{
                                    pr: 2,
                                  }}
                                >
                                  <img
                                    src={showPassword ? eyes : eyelashes}
                                    alt=""
                                    style={{ width: 40, height: 40 }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              "& .MuiInputBase-input": {
                                color: "#fff1cb",
                                "&.Mui-disabled": {
                                  WebkitTextFillColor:
                                    "rgba(255, 241, 203, 0.75)", // disabled 時文字顏色
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff1cb",
                              },
                            },
                          }}
                          sx={{
                            width: "100%",
                            mb: 3,
                            "& label.Mui-focused": {
                              color: "#fff1cb",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff1cb",
                                color: "#fff1cb",
                              },
                              "&:hover fieldset": {
                                borderColor: "#ffe580",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff1cb",
                              },
                              "&.Mui-disabled fieldset": {
                                borderColor: "rgba(255, 241, 203, 0.75)",
                              },
                            },
                          }}
                        />
                        <TextField
                          name="new"
                          label={
                            language === "zh-TW"
                              ? "新密碼，長度須為6碼以上"
                              : "New Password. At least 6 characters"
                          }
                          type={showNewPassword ? "text" : "password"}
                          fullWidth
                          margin="dense"
                          value={passwordForm.new}
                          onChange={handlePasswordChange}
                          InputLabelProps={{
                            sx: {
                              color: "rgba(255,255,255,0.8)",
                              zIndex: 1,
                              fontSize: "16px",
                              fontFamily: "Noto Serif TC",
                              "&.Mui-disabled": {
                                color: "#ffd39d",
                              },
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowNewPassword((prev) => !prev)
                                  }
                                  edge="end"
                                  sx={{
                                    pr: 2,
                                  }}
                                >
                                  <img
                                    src={showNewPassword ? eyes : eyelashes}
                                    alt=""
                                    style={{ width: 40, height: 40 }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              "& .MuiInputBase-input": {
                                color: "#fff1cb",
                                "&.Mui-disabled": {
                                  WebkitTextFillColor:
                                    "rgba(255, 241, 203, 0.75)", // disabled 時文字顏色
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff1cb",
                              },
                            },
                          }}
                          sx={{
                            width: "100%",
                            mb: 3,
                            "& label.Mui-focused": {
                              color: "#fff1cb",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff1cb",
                                color: "#fff1cb",
                              },
                              "&:hover fieldset": {
                                borderColor: "#ffe580",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff1cb",
                              },
                              "&.Mui-disabled fieldset": {
                                borderColor: "rgba(255, 241, 203, 0.75)",
                              },
                            },
                          }}
                        />
                        <TextField
                          name="confirm"
                          label={
                            language === "zh-TW"
                              ? "確認新密碼"
                              : "Confirm New Password"
                          }
                          type={showConfirmPassword ? "text" : "password"}
                          fullWidth
                          margin="dense"
                          value={passwordForm.confirm}
                          onChange={handlePasswordChange}
                          InputLabelProps={{
                            sx: {
                              color: "rgba(255,255,255,0.8)",
                              zIndex: 1,
                              fontSize: "16px",
                              fontFamily: "Noto Serif TC",
                              "&.Mui-disabled": {
                                color: "#ffd39d",
                              },
                            },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                  }
                                  edge="end"
                                  sx={{
                                    pr: 2,
                                  }}
                                >
                                  <img
                                    src={showConfirmPassword ? eyes : eyelashes}
                                    alt=""
                                    style={{ width: 40, height: 40 }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              "& .MuiInputBase-input": {
                                color: "#fff1cb",
                                "&.Mui-disabled": {
                                  WebkitTextFillColor:
                                    "rgba(255, 241, 203, 0.75)", // disabled 時文字顏色
                                },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#fff1cb",
                              },
                            },
                          }}
                          sx={{
                            width: "100%",
                            mb: 3,
                            "& label.Mui-focused": {
                              color: "#fff1cb",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff1cb",
                                color: "#fff1cb",
                              },
                              "&:hover fieldset": {
                                borderColor: "#ffe580",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#fff1cb",
                              },
                              "&.Mui-disabled fieldset": {
                                borderColor: "rgba(255, 241, 203, 0.75)",
                              },
                            },
                          }}
                        />
                      </DialogContent>
                      <DialogActions
                        sx={{
                          backgroundColor: "#184f42",
                          px: 3,
                          pb: 2,
                        }}
                      >
                        <Button
                          onClick={closePasswordDialog}
                          sx={{
                            width: "150px",
                            color: "#ad7d30",
                            borderRadius: "2px",
                            fontFamily: "Noto Serif TC",
                            fontSize: "16px",
                            fontWeight: "600",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          {t("profile.profileInfo.cancel")}
                        </Button>
                        <Button
                          onClick={handlePasswordSubmit}
                          sx={{
                            backgroundColor: "#fbce97",
                            color: "#684412",
                            border: "#684412 2px solid",
                            borderRadius: "2px",
                            width: "150px",
                            fontFamily: "Noto Serif TC",
                            fontSize: "16px",
                            fontWeight: "600",
                            "&:hover": {
                              backgroundColor: "#fddeb8",
                            },
                          }}
                        >
                          {t("profile.profileInfo.confirm")}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          className={`${selectedSection === "" ? "hide" : ""} back-btn`}
          onClick={() => {
            setSelectedSection("");
            setShowContent(false);
          }}
        >
          {t("profile.back")}
        </button>
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
