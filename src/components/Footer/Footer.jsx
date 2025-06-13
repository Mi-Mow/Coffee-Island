import { useTranslation } from "react-i18next";
import facebook from "../../assets/footer/facebook.svg";
import instagram from "../../assets/footer/instagram.svg";
import line from "../../assets/footer/line.svg";
import twitter from "../../assets/footer/twitter.svg";
import './Footer.scss';
function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer>
        <div className="copyright">
          <p>copyright &copy; 2025 {t("footer.title")}.All rights reserved.</p>
        </div>
        <div className="icons">
          <div className="icon-container">
            <img src={facebook} alt="facebook" />
          </div>
          <div className="icon-container">
            <img src={instagram} alt="instagram" />
          </div>
          <div className="icon-container">
            <img src={line} alt="line" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
