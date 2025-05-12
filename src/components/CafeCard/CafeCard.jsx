import s from './CafeCard.module.scss'
import { useNavigate } from 'react-router-dom';

function CafeCard({title, desc, rating, img, id, district}) {
  const navigate = useNavigate();

  return (
    <>
      <div className={s.card} onClick={() => {
        navigate(`/map/${district}/cafe/${id}`)
      }}>
        <div className={s.imgContainer}>
          {/* <img src={imgPath} alt="" /> */}
          <img src={`/cafe/${img}.jpg`} alt="" />
        </div>
        <div className={s.text}>
          <div className={s.cardTitle}>
            <div className={s.name}>{title}</div>
            <div className={s.rating}>★ {rating}</div>
          </div>
          <div className={s.description}>
            {desc}
          </div>
        </div>
      </div>
    </>
  );
}

export default CafeCard;
