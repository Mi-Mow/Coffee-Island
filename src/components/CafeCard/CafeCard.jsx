import s from "./CafeCard.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import heartOutline from "../../assets/map/icon-heart-white.svg";
import heartFilled from "../../assets/map/icon-heart-red.svg";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useLanguage } from "../../context/LanguageContext";
const base = import.meta.env.BASE_URL;

function CafeCard({
  title,
  desc,
  rating,
  img,
  cafe,
  size,
  displayFilter,
  isFavorite,
  toggleFavorite,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  // const [isFavorite, setIsFavorite] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const pathRegex = /^\/Coffee-Island\/\map\/[^/]+\/cafe/;

  const handleClick = () => {
    if (pathRegex.test(location.pathname)) {
      const cafeInfo = document.getElementById("cafeInfo");
      cafeInfo.scrollIntoView();
      if (cafeInfo) {
        navigate(`${base}map/${cafe.district_id}/cafe/${cafe.id}`, {
          state: { cafe, displayFilter },
        });
      }
    } else {
      navigate(`${base}map/${cafe.district_id}/cafe/${cafe.id}`, {
        state: { cafe, displayFilter },
      });
    }
  };

  return (
    <>
      <div
        className={`${s.card} ${size === "small" ? s.small : ""} ${size === "popularCard" ? s.popularCard : ""}`}
        onClick={handleClick}
      >
        <div className={s.imgContainer}>
          <img src={`${base}cafe/${img}.jpg`} alt="" />
          <div
            className={s.heartContainer}
            onClick={(e) => toggleFavorite(cafe, e, "cafe")}
          >
            <img
              src={isFavorite ? heartFilled : heartOutline}
              alt=""
              className="heart-icon"
            />
          </div>
        </div>
        <div className={s.text}>
          <div className={s.cardTitle}>
            <div className={s.name}>{language === "zh-TW" ? <>{cafe?.name_zh}</> : <>{cafe?.name_en}</>}</div>
            <div className={s.rating}>★ {rating}</div>
          </div>
          <div className={s.description}>
            {language === "zh-TW" ? <>{cafe?.desc_zh}</> : <>{cafe?.desc_en}</>}
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ right: { xs: 90, sm: 90 } }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ backgroundColor: "#7b4519" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CafeCard;
