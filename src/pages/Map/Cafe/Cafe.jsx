import { useLocation, useNavigate } from "react-router-dom";
import "./Cafe.scss";
import heartOutline from "../../../assets/map/icon-heart-white.svg";
import heartFilled from "../../../assets/map/icon-heart-red.svg";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import Slider from "../../../components/Slider/Slider";
import address from "../../../assets/map/icon-location.svg";
import priceLevel from "../../../assets/map/icon-price.svg";
import openingHour from "../../../assets/map/icon-time.svg";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CafeCard from "../../../components/CafeCard/CafeCard";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const base = import.meta.env.BASE_URL;

const getRandom = (data) => {
  const selectedIndices = new Set();
  while (selectedIndices.size < 8) {
    const randomIndex = Math.floor(Math.random() * data.length);
    selectedIndices.add(randomIndex);
  }
  return Array.from(selectedIndices).map((index) => data[index]);
};

function Cafe() {
  const location = useLocation();
  const navigate = useNavigate();
  let randomDataRef = useRef(null);
  // const { cafe, displayFilter } = location.state || {};
  // const { cafes } = useCafeData();
  const cafes = JSON.parse(localStorage.getItem("cafes"));
  const { t } = useTranslation();

  const [cafe, setCafe] = useState(null);
  const [displayFilter, setDisplayFilter] = useState([]);
  const [tags, setTags] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    // console.log("current cafe ", location.state.cafe);
    // console.log("filter: ", location.state.displayFilter);
    if (location.state?.cafe && location.state?.displayFilter) {
      sessionStorage.setItem(
        "currentCafe",
        JSON.stringify(location.state.cafe)
      );
      sessionStorage.setItem(
        "displayFilter",
        JSON.stringify(location.state.displayFilter)
      );
      sessionStorage.setItem("tags", JSON.stringify(location.state.cafe.tags));
      setCafe(location.state.cafe);
      setDisplayFilter(location.state.displayFilter);
      setTags(location.state.cafe.tags);
    } else {
      // if there is no data from location.state, get data from session storage
      const savedCafe = sessionStorage.getItem("currentCafe");
      const savedFilter = sessionStorage.getItem("displayFilter");
      const savedTags = sessionStorage.getItem("tags");
      if (savedCafe && savedFilter) {
        setCafe(JSON.parse(savedCafe));
        setDisplayFilter(JSON.parse(savedFilter));
        setTags(JSON.parse(savedTags));
      }
    }

    if (location.state.displayFilter.length > 1) {
      tempCafes = location.state.displayFilter.filter(
        (item) => item.id !== location.state.cafe.id
      );
      if (tempCafes.length > 8) {
        if (!randomDataRef.current) {
          randomDataRef.current = getRandom(tempCafes);
        }
      } else {
        randomDataRef.current = tempCafes;
      }
    } else {
      if (!randomDataRef.current) {
        randomDataRef.current = getRandom(cafes);
      }
    }
  }, [location.state]);

  // console.log("displayFilter", displayFilter);

  let recommendCafes = [];
  let tempCafes = [];
  // if (displayFilter.length > 1) {
  //   tempCafes = displayFilter.filter((item) => item.id !== cafe.id);
  //   if (tempCafes.length > 8) {
  //     if (!randomDataRef.current) {
  //       randomDataRef.current = getRandom(tempCafes);
  //     }
  //   } else {
  //     randomDataRef.current = tempCafes;
  //   }
  // } else {
  //   if (!randomDataRef.current) {
  //     console.log("random cafes: ", cafes);
  //     randomDataRef.current = getRandom(cafes);
  //   }
  // }

  // useEffect(() => {
  //   console.log("useEffect");
  //   if (cafes && cafes.length > 0 && !randomDataRef.current) {
  //     console.log("Cafes data loaded:", cafes);

  //     let tempCafes = [];
  //     if (displayFilter?.length > 1) {
  //       tempCafes = displayFilter.filter((item) => item.id !== cafe.id);

  //       if (tempCafes.length > 8) {
  //         randomDataRef.current = getRandom(tempCafes);
  //       } else {
  //         randomDataRef.current = tempCafes;
  //       }
  //     } else {
  //       randomDataRef.current = getRandom(cafes);
  //     }

  //     console.log("Randomly selected cafes:", randomDataRef.current);
  //   }
  // }, []);

  // console.log("recommendCafes", recommendCafes);

  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    setOpenSnackBar(true);
  };

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const tagsMapping = [
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
  ];

  // const tags = cafe.tags;
  // console.log("tags: ",tags);

  const today = new Date();
  const todayDay = today.getDay();

  const getTagLabel = (tagId) => {
    const tag = tagsMapping.find((tag) => tag.id === tagId);
    return tag ? tag[language === "zh-TW" ? "zh" : "en"] : tagId;
  };

  const dayMapping = [
    { zh: "星期日", en: "Sunday" },
    { zh: "星期一", en: "Monday" },
    { zh: "星期二", en: "Tuesday" },
    { zh: "星期三", en: "Wednesday" },
    { zh: "星期四", en: "Thursday" },
    { zh: "星期五", en: "Friday" },
    { zh: "星期六", en: "Saturday" },
  ];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const backToFilter = () => {
    navigate(`${base}map/${cafe.district_id}`, { state: { scrollToFilter: true } });
  };

  const infoRef = useRef(null);

  return (
    <>
      <div className="cafe">
        <section className="cafe-info" ref={infoRef} id="cafeInfo">
          <div className="header">
            <div className="title">
              {language === "zh-TW" ? (
                <>{cafe?.name_zh}</>
              ) : (
                <>{cafe?.name_en}</>
              )}
            </div>
            <div className="icon">
              <div className="heartContainer" onClick={toggleFavorite}>
                <img
                  src={isFavorite ? heartFilled : heartOutline}
                  alt=""
                  className="heart-icon"
                />
              </div>
            </div>
            <div className="tags">
              {tags?.map((tag, index) => (
                <p className="tag" key={index}>
                  #{getTagLabel(tag)}
                </p>
              ))}
            </div>
          </div>
          <div className="desc">{cafe?.description}</div>
          {/* Slider */}
          <Slider
            imageQ={cafe?.img_q}
            district={cafe?.district_id}
            id={cafe?.id}
          />
          <div className="info">
            <div className="location info-item">
              <a href={cafe?.map_link} target="_blank">
                <div className="icon-container">
                  <img src={address} alt="" />
                </div>
              </a>
              <a href={cafe?.map_link} target="_blank">
                <p className="address">
                  {language === "zh-TW" ? cafe?.address : cafe?.address_en}
                </p>
              </a>
            </div>
            <div className="opening-hour info-item">
              <div className="icon-container">
                <img src={openingHour} alt="" />
              </div>
              {cafe?.opening_hours[todayDay] ? (
                <p>
                  {t("map.cafe.today_opening_hours")}{" "}
                  {cafe?.opening_hours[todayDay]}
                </p>
              ) : (
                <p>{t("map.cafe.today_day_off")}</p>
              )}
              <button className="more-btn" onClick={handleOpen}>
                {t("map.cafe.more_info")}
              </button>
            </div>
            <div className="price-level info-item">
              <div className="icon-container">
                <img src={priceLevel} alt="" />
              </div>
              <p>{cafe?.price_level}</p>
            </div>
          </div>
          <Dialog onClose={handleClose} open={isOpen} sx={{}}>
            <DialogTitle
              sx={{
                fontFamily: "Noto Serif TC",
                backgroundColor: "#fff1cb",
                color: "#7B4519",
                fontWeight: "bold",
              }}
            >
              {t("map.cafe.opening_hours")}
            </DialogTitle>
            <List
              sx={{
                pt: 0,
                width: "350px",
                backgroundColor: "#fff1cb",
                color: "#7B4519",
              }}
            >
              {dayMapping.map((day, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    padding: "0 24px 16px",
                    fontWeight: "500",
                  }}
                >
                  <div className="day">
                    {language === "zh-TW" ? day.zh : day.en}
                  </div>
                  <div className="time">
                    {cafe?.opening_hours[index]
                      ? cafe?.opening_hours[index]
                      : t("map.cafe.today_day_off")}
                  </div>
                </ListItem>
              ))}
            </List>
            <button className="close-btn" onClick={handleClose}>
              {t("map.cafe.close")}
            </button>
          </Dialog>
        </section>
        <section className="recommend">
          <div className="content">
            <div className="title">更多咖啡廳</div>
            <div className="cards">
              {randomDataRef.current?.map((cafe, index) => (
                <CafeCard
                  size="small"
                  key={index}
                  title={cafe.name_zh}
                  desc={cafe.description}
                  rating={cafe.rating}
                  img={`${cafe?.district_id}_${cafe?.id}_1`}
                  cafe={cafe}
                  displayFilter={displayFilter}
                />
              ))}
            </div>
            <div className="btn-container">
              <button onClick={backToFilter} className="back-btn">
                返回篩選
              </button>
            </div>
          </div>
        </section>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#7b4519" }}
        >
          {isFavorite ? "已加入收藏" : "已從收藏中移除"}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Cafe;
