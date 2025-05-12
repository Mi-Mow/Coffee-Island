import s from './CafeCard.module.scss'
import cafeImages from '../../../public/cafe/CafeImages';
import { useNavigate } from 'react-router-dom';

function CafeCard({title, desc, rating, img, id, district}) {
  const cafeSrc = cafeImages[img];
  const imgPath = cafeSrc?.slice(7);

  const navigate = useNavigate();
  // console.log("imgPath", imgPath);
  return (
    <>
      <div className={s.card} onClick={() => {
        navigate(`/map/${district}/cafe/${id}`)
      }}>
        <div className={s.imgContainer}>
          <img src={imgPath} alt="" />
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
