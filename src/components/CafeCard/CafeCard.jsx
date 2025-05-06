import s from './CafeCard.module.scss'
import shopImg from "../../assets/map/1-1.jpg";

function CafeCard() {
  return (
    <>
      <div className={s.card}>
        <div className={s.imgContainer}>
          <img src={shopImg} alt="" />
        </div>
        <div className={s.text}>
          <div className={s.cardTitle}>
            <div className={s.name}>島上咖啡廳</div>
            <div className={s.score}>4.7(32)</div>
          </div>
          <div className={s.description}>
            內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文內文
          </div>
        </div>
      </div>
    </>
  );
}

export default CafeCard;
