import s from "./CafeCard.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import heartOutline from "../../assets/map/icon-heart-white.svg";
import heartFilled from "../../assets/map/icon-heart-red.svg";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function CafeCard({ title, desc, rating, img, cafe, size, displayFilter }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const toggleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    setOpenSnackBar(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const pathRegex = /^\/map\/[^/]+\/cafe/;

  const handleClick = () => {
    if (pathRegex.test(location.pathname)) {
      const cafeInfo = document.getElementById("cafeInfo");
      if (cafeInfo) {
        cafeInfo.scrollIntoView();
        navigate(`/map/${cafe.district_id}/cafe/${cafe.id}`, {
          state: { cafe, displayFilter },
        });
      }
    } else {
      navigate(`/map/${cafe.district_id}/cafe/${cafe.id}`, {
        state: { cafe, displayFilter },
      });
    }
  };

  return (
    <>
      <div
        className={`${s.card} ${size === "small" ? s.small : ""}`}
        onClick={handleClick}
      >
        <div className={s.imgContainer}>
          <img src={`/cafe/${img}.jpg`} alt="" />
          <div className={s.heartContainer} onClick={toggleFavorite}>
            <img
              src={isFavorite ? heartFilled : heartOutline}
              alt=""
              className="heart-icon"
            />
          </div>
        </div>
        <div className={s.text}>
          <div className={s.cardTitle}>
            <div className={s.name}>{title}</div>
            <div className={s.rating}>★ {rating}</div>
          </div>
          <div className={s.description}>{desc}</div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#7b4519" }}
        >
          { isFavorite ? "已加入收藏" : "已從收藏中移除" }
        </Alert>
      </Snackbar>
    </>
  );
}

export default CafeCard;
