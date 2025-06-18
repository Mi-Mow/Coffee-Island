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
import { useTranslation } from "react-i18next";
const base = import.meta.env.BASE_URL;

function About() {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [msg, setMsg] = useState("");
  const { snackbarMsg } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const lang = i18n.language === "zh-TW" ? "zh" : "en";
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
   }

  const aboutTexts = {
    intro: {
      zh: "我們不是什麼潮到不行的品牌團隊<br />只是四個喝太多咖啡的咖啡人",
      en: "We're not some ultra-trendy branding team.<br />Just four coffee lovers who drink way too much."
    },
    memory: {
      zh: `是否還記得<br />
還記得錄音帶轉到第 A 首歌<br />
還記得老捷運月台燈閃爍聲<br />
還記得在巷口紅磚牆邊第一次喝下冰美式的你嗎<br />
咖啡只是媒介<br />
我們想做的，是一個<br />
讓你像是翻開回憶錄的網頁<br />
裡面藏著我們對「美好年代」的全部想像<br />
也藏著台北這座城市，對台式浪漫的一番風味`,
      en: `Do you still remember—<br />
The first song on a cassette tape?<br />
The flickering lights on the old MRT platform?<br />
Your first sip of iced Americano by that red brick wall at the corner?<br />
Coffee is just a medium.<br />
What we truly want to create is<br />
a webpage that feels like opening a photo album,<br />
filled with all our dreams of a "beautiful era."<br />
It also captures the unique charm of Taipei's own take on romance.`
    },
    question: {
      zh: "你在找尋什麼味道呢?<br />或許，不是那一杯咖啡，而是你還沒忘的那一段時光。",
      en: "What flavor are you searching for?<br />Maybe it’s not just the coffee, but the moment you haven’t forgotten."
    },
    greeting: {
      zh: "您好，我們是",
      en: "Hi there, we are"
    },
    invite: {
      zh: "如果你準備好了，那就來場都市裡的味覺漫遊——",
      en: "If you're ready, let’s begin a flavor journey through the city—"
    },
    button: {
      zh: "探索旅程",
      en: "Start Exploring"
    }
  };

  return (
    <section className="about">
      <div className="about__content">
        <p dangerouslySetInnerHTML={{ __html: aboutTexts.intro[lang] }} />

        <div className="about__imagegroup">
          {[aboutGirl1, aboutGirl2, aboutGirl3, aboutGirl4].map((img, i) => (
            <div className="about__imagegirl" key={i}>
              <img src={img} alt={`girl${i + 1}`} />
            </div>
          ))}
        </div>

        <div className="circle-outline"></div>

        <p id="nav" dangerouslySetInnerHTML={{ __html: aboutTexts.memory[lang] }} />
        <p dangerouslySetInnerHTML={{ __html: aboutTexts.question[lang] }} />
        <p>{aboutTexts.greeting[lang]}</p>

        <img src={aboutImage} alt="LOGO" className="about__image" />

        <p>{aboutTexts.invite[lang]}</p>
        <a href={`${base}`} className="about__button">{aboutTexts.button[lang]}</a>
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
