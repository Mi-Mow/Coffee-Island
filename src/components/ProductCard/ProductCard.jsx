import { useLanguage } from "../../context/LanguageContext";
import { products } from "../../pages/Products/Products";
import heartOutline from "../../assets/map/icon-heart-white.svg";
import heartFilled from "../../assets/map/icon-heart-red.svg";
import "./ProductCard.scss";
import { useNavigate } from "react-router-dom";
const base = import.meta.env.BASE_URL;

function ProductCard({ id, isFavorite, toggleFavorite }) {
  const currentProduct = products.find((item) => item.id === id);
  const { language } = useLanguage();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="products-card"
        key={currentProduct.id}
        onClick={() => navigate(`${base}products/${currentProduct.id}`)}
        style={{ cursor: "pointer" }}
      >
        {/* <div className="tag">
          {language === "zh-TW" ? currentProduct.tagZH : currentProduct.tagEN}
        </div> */}
        <img className="product-img" src={currentProduct.hoverImage} alt={currentProduct.name} />
        {currentProduct.isNew && <div className="new-tag">NEW</div>}
        <div className="info">
          <p className="name">
            {language === "zh-TW"
              ? currentProduct.nameZH
              : currentProduct.nameEN}
          </p>
          <p className="price">
            NT${currentProduct.price}{" "}
            <span className="old-price">NT${currentProduct.oldPrice}</span>
          </p>
        </div>
        <div
          className="heartContainer"
          onClick={(e) => toggleFavorite(product, e)}
        >
          <img
            src={isFavorite ? heartFilled : heartOutline}
            alt="heart-icon"
            className="heart-icon"
          />
        </div>
      </div>
    </>
  );
}

export default ProductCard;
