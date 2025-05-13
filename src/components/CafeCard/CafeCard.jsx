import s from "./CafeCard.module.scss";
import { useNavigate } from "react-router-dom";
import heartOutline from "../../assets/map/icon-heart-white.svg";
import heartFilled from "../../assets/map/icon-heart-red.svg";
import { useState } from "react";

function CafeCard({ title, desc, rating, img, cafe }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div
        className={s.card}
        onClick={() => {
          navigate(`/map/${cafe.district_id}/cafe/${cafe.id}`, {
            state: { cafe },
          });
        }}
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
    </>
  );
}

export default CafeCard;
