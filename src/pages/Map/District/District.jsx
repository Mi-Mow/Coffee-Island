import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
import shopImg from "../../../assets/map/1-1.jpg";

function District() {
  useEffect(() => {
    // start at (0, 0)
    window.scrollTo(0, 0);
  }, []);


  const { district } = useParams();

  const districtMap = {
    beitou: {
      name: "北投區",
      img: beitou,
    },
    shilin: {
      name: "士林區",
      img: shilin,
    },
    datong: {
      name: "大同區",
      img: datong,
    },
    zhongshan: {
      name: "中山區",
      img: zhongshan,
    },
    songshan: {
      name: "松山區",
      img: songshan,
    },
    neihu: {
      name: "內湖區",
      img: neihu,
    },
    wanhua: {
      name: "萬華區",
      img: wanhua,
    },
    zhongzheng: {
      name: "中正區",
      img: zhongzheng,
    },
    daan: {
      name: "大安區",
      img: daan,
    },
    xinyi: {
      name: "信義區",
      img: xinyi,
    },
    nangang: {
      name: "南港區",
      img: nangang,
    },
    wenshan: {
      name: "文山區",
      img: wenshan,
    },
  };
  const districtName = districtMap[district].name;
  const districtImg = districtMap[district].img;

  const filterRef = useRef(null);
  const scrollDown = () => {
    filterRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <section className={s.main}>
        <div className={s.content}>
          {/* Left side */}
          <div className={s.districtImg}>
            <img src={districtImg} alt="" />
          </div>
          {/* Right side */}
          <div className={s.popular}>
            <div className={s.title}>{districtName} 熱門咖啡廳</div>
            <div className={s.cards}>
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
            </div>
            <div className={s.btn}>
              <div className={s.btnBg} onClick={scrollDown}>
                <button>see more</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={s.filter} ref={filterRef}>
        filter section
      </section>
    </>
  );
}

export default District;
