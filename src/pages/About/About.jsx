import { useContext, useEffect, useState } from 'react';
import './About.scss';
import aboutImage from './image/about1.png';
import aboutGirl1 from './image/about2.png';
import aboutGirl2 from './image/about3.png';
import aboutGirl3 from './image/about4.png';
import aboutGirl4 from './image/about5.png';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AuthContext } from '../../context/AuthContext';
function About() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [msg, setMsg] = useState("");
  const { snackbarMsg } = useContext(AuthContext);
  localStorage.setItem("currentPath", location.pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (snackbarMsg) {
      setOpenSnackBar(true);
      setMsg(snackbarMsg);
    } else {
      setOpenSnackBar(false);
    }
  }, [snackbarMsg]);

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <section className="about">
      <div className="about__content">
        <p >我們不是什麼潮到不行的品牌團隊<br />只是四個喝太多咖啡的咖啡人</p>
        <div className="about__imagegroup">
          <div className="about__imagegirl">
            <img src={aboutGirl1} alt="girl1" />

          </div>
          <div className="about__imagegirl">
            <img src={aboutGirl2} alt="girl2" />

          </div>
          <div className="about__imagegirl">
            <img src={aboutGirl3} alt="girl3" />

          </div>
          <div className="about__imagegirl">
            <img src={aboutGirl4} alt="girl4" />

          </div>
        </div>
        <div className="circle-outline"></div>

        <p id='nav'>是否還記得<br />
          還記得錄音帶轉到第 A 首歌<br />
          還記得老捷運月台燈閃爍聲<br />
          還記得在巷口紅磚牆邊第一次喝下冰美式的你嗎<br />
          咖啡只是媒介<br />
          我們想做的，是一個<br />
          讓你像是翻開回憶錄的網頁<br />
          裡面藏著我們對「美好年代」的全部想像<br />
          也藏著台北這座城市，對台式浪漫的一番風味</p>

        <p >你在找尋什麼味道呢?<br />
          或許，不是那一杯咖啡，而是你還沒忘的那一段時光。</p>
        <p>您好，我們是</p>
        <img
          src={aboutImage}
          alt="LOGO"
          className="about__image"
        />
        <p>如果你準備好了，那就來場都市裡的味覺漫遊——</p>
    
        <a href="/#map" className="about__button">探索旅程</a>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ right: { xs: 70, sm: 70 } }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#0a7e5d" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </section>
  );
}

export default About;



