import facebook from "../../assets/footer/facebook.svg";
import instagram from "../../assets/footer/instagram.svg";
import line from "../../assets/footer/line.svg";
import twitter from "../../assets/footer/twitter.svg";
import './Footer.scss';
function Footer() {
  return (
    <>
      <footer>
        <div className="copyright">
          <p>copyright &copy; 2025 咖啡島.All rights reserved.</p>
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
          <div className="icon-container">
            <img src={twitter} alt="twitter" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
