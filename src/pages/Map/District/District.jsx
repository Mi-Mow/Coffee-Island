import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import s from "./District.module.scss";
import beitou from "../../../assets/home/district/beitou.svg";
import shilin from "../../../assets/home/district/shilin.svg";
import datong from "../../../assets/home/district/datong.svg";
import zhongshan from "../../../assets/home/district/zhongshan.svg";
import songshan from "../../../assets/home/district/songshan.svg";
import neihu from "../../../assets/home/district/neihu.svg";
import wanhua from "../../../assets/home/district/wanhua.svg";
import zhongzheng from "../../../assets/home/district/zhongzheng.svg";
import daan from "../../../assets/home/district/daan.svg";
import xinyi from "../../../assets/home/district/xinyi.svg";
import nangang from "../../../assets/home/district/nangang.svg";
import wenshan from "../../../assets/home/district/wenshan.svg";
import cross from "../../../assets/map/cross.svg";
import filter from "../../../assets/map/filter.svg";
import distBg from "../../../assets/map/distBg.svg";
import CafeMap from "../../../components/CafeMap/CafeMap";
import CafeCard from "../../../components/CafeCard/CafeCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import monsterRecommend from "../../../assets/map/monster-recommend.svg";
import useIsMobile from "../../../hooks/useIsMobile";
import { useLanguage } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

function District() {
  const location = useLocation();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [msg, setMsg] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.state?.scrollToFilter) {
      const filter = document.getElementById("filter");
      if (filter) {
        filter.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  localStorage.setItem("currentPath", location.pathname);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );

  const toggleFavorite = (cafe, event) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    event.stopPropagation();
    if (isLoggedIn) {
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUser = { ...currentUser };
      const cafeExists = updatedUser.favorite.cafes.some(
        (item) => item.id === cafe.id
      );

      if (cafeExists) {
        // delete cafe
        updatedUser.favorite.cafes = updatedUser.favorite.cafes.filter(
          (item) => item.id !== cafe.id
        );
        setMsg("已從收藏中移除");
        setOpenSnackBar(true);
      } else {
        // add cafe
        updatedUser.favorite.cafes.push(cafe);
        setMsg("已加入收藏");
        setOpenSnackBar(true);
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

  const { district } = useParams();

  const districtMap = {
    beitou: {
      name: "北投區",
      nameEN: "Beitou",
      img: beitou,
    },
    shilin: {
      name: "士林區",
      nameEN: "Shilin",
      img: shilin,
    },
    datong: {
      name: "大同區",
      nameEN: "Datong",
      img: datong,
    },
    zhongshan: {
      name: "中山區",
      nameEN: "Zhongshan",
      img: zhongshan,
    },
    songshan: {
      name: "松山區",
      nameEN: "Songshan",
      img: songshan,
    },
    neihu: {
      name: "內湖區",
      nameEN: "Neihu",
      img: neihu,
    },
    wanhua: {
      name: "萬華區",
      nameEN: "Wanhua",
      img: wanhua,
    },
    zhongzheng: {
      name: "中正區",
      nameEN: "Zhongzheng",
      img: zhongzheng,
    },
    daan: {
      name: "大安區",
      nameEN: "Daan",
      img: daan,
    },
    xinyi: {
      name: "信義區",
      nameEN: "Xinyi",
      img: xinyi,
    },
    nangang: {
      name: "南港區",
      nameEN: "Nangang",
      img: nangang,
    },
    wenshan: {
      name: "文山區",
      nameEN: "Wenshan",
      img: wenshan,
    },
  };
  const districtName =
    language === "zh-TW"
      ? districtMap[district].name
      : districtMap[district].nameEN;
  const districtImg = districtMap[district].img;

  const allTags = [
    {
      id: "wifi",
      zh: "WiFi",
      en: "WiFi",
    },
    {
      id: "plug",
      zh: "插座",
      en: "Power Outlet",
    },
    {
      id: "special",
      zh: "特色咖啡",
      en: "Special",
    },
    {
      id: "latteArt",
      zh: "拉花",
      en: "Latte art",
    },
    {
      id: "handbrew",
      zh: "職人手沖",
      en: "Hand Brew",
    },
    // {
    //   id: "roaster",
    //   zh: "自家烘焙",
    //   en: "In-house Roaster",
    // },
    {
      id: "dessert",
      zh: "甜點搭配",
      en: "Dessert",
    },
    {
      id: "noTimeLimit",
      zh: "不限時間",
      en: "No Time Limit",
    },
    {
      id: "petFriendly",
      zh: "寵物友善",
      en: "Pet Friendly",
    },
    // {
    //   id: "LGBTFriendly",
    //   zh: "LGBT友善",
    //   en: "LGBT Friendly",
    // },
  ];

  // let selectedTags = [];
  const districtLabels = [
    { id: "beitou", label: "北投區", labelEN: "Beitou" },
    { id: "shilin", label: "士林區", labelEN: "Shilin" },
    { id: "datong", label: "大同區", labelEN: "Datong" },
    { id: "zhongshan", label: "中山區", labelEN: "Zhongshan" },
    { id: "songshan", label: "松山區", labelEN: "Songshan" },
    { id: "neihu", label: "內湖區", labelEN: "Neihu" },
    { id: "wenshan", label: "文山區", labelEN: "Wenshan" },
    { id: "wanhua", label: "萬華區", labelEN: "Wanhua" },
    { id: "zhongzheng", label: "中正區", labelEN: "Zhongzheng" },
    { id: "daan", label: "大安區", labelEN: "Daan" },
    { id: "nangang", label: "南港區", labelEN: "Nangang" },
    { id: "xinyi", label: "信義區", labelEN: "Xinyi" },
  ];

  const cafes = JSON.parse(localStorage.getItem("cafes"));
  // console.log("cafes", cafes)
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const displayFilter =
    cafes.filter(
      (cafe) =>
        selectedTags.every((tag) => cafe.tags.includes(tag)) &&
        (selectedAreas.length === 0 ||
          selectedAreas.some((areaTag) => cafe.district_id === areaTag))
    ) || [];

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: 280, // 下拉選單的最大高度
        // width: 150,           // 下拉選單的寬度
        backgroundColor: "#904118",
        "&::-webkit-scrollbar": {
          width: "12px", // Scroll Bar 寬度
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#6b3112", // 滑塊顏色
          borderRadius: "99px", // 滑塊圓角
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#55270e", // 滑塊在 hover 時顏色
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#fff1cb", // 軌道顏色
        },
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(typeof value === "string" ? value.split(",") : value);
  };
  // console.log("area:", selectedAreas);
  // console.log("tags", selectedTags);
  // console.log("filter", displayFilter);

  const filterRef = useRef(null);
  const scrollDown = () => {
    filterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let displayPopular = [];
  displayPopular = cafes.filter((cafe) => cafe.district_id === district);
  // console.log("popular", displayPopular);

  const clearTags = () => {
    setSelectedTags([]);
    setSelectedAreas([]);
  };

  const openFilter = () => {
    console.log("open");
    setIsOpenFilter(true);
  };

  const handleCloseFilter = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return
    }
    setIsOpenFilter(false);
  };

  return (
    <>
      <section className={s.recommend}>
        <div className={s.content}>
          {/* Left side */}
          {!isMobile && (
            <div className={s.districtImg}>
              <img src={districtImg} alt="" />
            </div>
          )}
          {/* Right side */}
          <div className={s.popular}>
            <div className={s.title}>
              <h1>
                {districtName} {t("map.district.popular")}
              </h1>
              <div className={s.monsterContainer}>
                <img src={monsterRecommend} alt="" />
              </div>
            </div>
            {isMobile && (
              <div className={s.districtImg}>
                <img src={districtImg} alt="" />
              </div>
            )}
            <div className={s.cards}>
              {displayPopular.slice(0, 3).map((cafe, index) => {
                const isFavorite = currentUser.favorite?.cafes.some(
                  (item) => item.id === cafe.id
                );
                return (
                  <CafeCard
                    size="popularCard"
                    key={index}
                    title={cafe.name_zh}
                    desc={cafe.description}
                    rating={cafe.rating}
                    img={`${cafe.district_id}_${cafe?.id}_1`}
                    cafe={cafe}
                    displayFilter={
                      selectedAreas.length === 0 && selectedTags.length === 0
                        ? []
                        : displayFilter
                    }
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
            <div className={s.btn}>
              <div className={s.btnBg} onClick={scrollDown}>
                <button>{t("map.district.more")}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Filter Section */}
      <section className={s.filter} ref={filterRef} id="filter">
        <div className={s.main}>
          {isMobile && (
            <div className={s.map}>
              <CafeMap filtered={displayFilter} />
            </div>
          )}
          {!isMobile && (
            <div className={s.tags}>
              <div className={s.areasTag}>
                <FormControl>
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    sx={{
                      fontFamily: "Noto Serif TC",
                      fontWeight: "600",
                      color: "#904118",
                      backgroundColor: "#fff1cb",
                      padding: "0 10px",
                      borderRadius: "99px",
                      textAlign: "center",
                      fontSize: "15px",
                      lineHeight: "22px",
                      alignItems: "center",
                      "&.Mui-focused": {
                        color: "#904118",
                      },
                    }}
                  >
                    {t("map.district.district")}
                  </InputLabel>
                  <Select
                    className={`${s.tag} ${s.areasTag} ${
                      selectedAreas.length > 0 ? s.active : ""
                    }`}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedAreas}
                    onChange={handleChange}
                    input={<OutlinedInput label={district.label} />}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            districtLabels.find(
                              (district) => district.id === id
                            )?.label
                        )
                        .join(", ")
                    }
                    sx={{
                      fontFamily: "Noto Serif TC",
                      width: "150px",
                      borderRadius: "0",
                      color: "#fff1cb",
                      transition: "0.2s background-color ease-in",
                      "&.Mui-focused": {
                        borderColor: "#fff1cb",
                        outline: "none",
                      },
                      "&:hover": {
                        backgroundColor: "#9e4a1d",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    MenuProps={menuProps}
                  >
                    {districtLabels.map((district) => (
                      <MenuItem
                        key={district.id}
                        value={district.id}
                        sx={{
                          fontFamily: "Noto Serif TC",
                          backgroundColor: "#904118",
                          color: "#fff1cb",
                          "&:hover": {
                            backgroundColor: "#a84f1f",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#c55d24", // 選中且滑過的背景色
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#b35320", // 選中時的背景色
                            color: "#fff",
                          },
                        }}
                      >
                        <Checkbox
                          checked={selectedAreas.includes(district.id)}
                          sx={{
                            color: "#fff",
                            "&.Mui-checked": {
                              color: "#fff1cb", // checkbox color
                            },
                          }}
                        />
                        <ListItemText
                          primary={
                            language === "zh-TW"
                              ? district.label
                              : district.labelEN
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {allTags.map((tag) => (
                <button
                  key={tag.id}
                  className={`${s.tag} ${s.filterTag} ${
                    selectedTags.includes(tag.id) ? s.active : ""
                  }`}
                  onClick={() => toggleTag(tag.id)}
                >
                  <p>{language === "zh-TW" ? tag.zh : tag.en}</p>
                  {selectedTags.includes(tag.id) ? (
                    <div className={s.cross}>
                      <img src={cross} alt="" />
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              ))}
              {selectedTags.length > 0 || selectedAreas.length > 0 ? (
                <button className={s.clearBtn} onClick={clearTags}>
                  {t("map.district.clear")}
                </button>
              ) : (
                ""
              )}
            </div>
          )}

          {isMobile && (
            <div className={`${s.tags}`}>
              <button
                className={`${s.tag} ${s.filterTag} ${s.filterBtn} ${
                  selectedTags.length > 0 || selectedAreas.length > 0
                    ? s.active
                    : ""
                }`}
                onClick={openFilter}
              >
                <p>{t("map.cafe.filter")}</p>
                <div className={s.iconContainer}>
                  <img src={filter} alt="" />
                </div>
              </button>
            </div>
          )}
          <Dialog onClose={handleCloseFilter} open={isOpenFilter} sx={{}} className={s.dialog}>
            <DialogTitle
              sx={{
                fontFamily: "Noto Serif TC",
                backgroundImage: `url(${distBg})`,
                backgroundRepeat: "repeat",
                backgroundSize: "25px 25px",
                backgroundColor: "#427066",
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              {t("map.cafe.filter")}
            </DialogTitle>
            <List
              sx={{
                pt: 0,
                paddingX: 1,
                pb: 3,
                width: "320px",
                backgroundImage: `url(${distBg})`,
                backgroundRepeat: "repeat",
                backgroundSize: "25px 25px",
                backgroundColor: "#427066",
                color: "#7B4519",
              }}
            >
              <div className={s.tags}>
                {allTags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`${s.tag} ${s.filterTag} ${
                      selectedTags.includes(tag.id) ? s.active : ""
                    }`}
                    onClick={() => toggleTag(tag.id)}
                  >
                    <p>{language === "zh-TW" ? tag.zh : tag.en}</p>
                    {selectedTags.includes(tag.id) ? (
                      <div className={s.cross}>
                        <img src={cross} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                ))}
                {selectedTags.length > 0 || selectedAreas.length > 0 ? (
                  <button className={s.clearBtn} onClick={clearTags}>
                    {t("map.district.clear")}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </List>
            <button className={s.confirmBtn} onClick={handleCloseFilter}>
              {t("map.cafe.confirm")}
            </button>
          </Dialog>
          <div className={s.content}>
            <div className={s.cards}>
              {displayFilter.map((cafe, index) => {
                const isFavorite = currentUser.favorite?.cafes.some(
                  (item) => item.id === cafe.id
                );

                return (
                  <CafeCard
                    key={index}
                    title={cafe.name_zh}
                    desc={cafe.description}
                    rating={cafe.rating}
                    img={`${cafe.district_id}_${cafe?.id}_1`}
                    cafe={cafe}
                    displayFilter={
                      selectedAreas.length === 0 && selectedTags.length === 0
                        ? []
                        : displayFilter
                    }
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
            {!isMobile && (
              <div className={s.map}>
                <CafeMap filtered={displayFilter} />
              </div>
            )}
          </div>
        </div>
      </section>
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

export default District;
