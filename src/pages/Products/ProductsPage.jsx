import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./ProductsPage.scss";
import { products } from "./Products";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import ProductCard from "../../components/ProductCard/ProductCard";

const base = import.meta.env.BASE_URL;

const descData = [
  { img: `${base}products/gooseneck1Des3.jpg`, title: "散熱口設計", desc: "快速散熱" },
  { img: `${base}products/gooseneck1Des2.jpg`, title: "轉速調節", desc: "手動調整刀盤轉速" },
  { img: `${base}products/gooseneck1Hover.jpg`, title: "金屬拋光開關", desc: "開關按鈕觸感升級" },
];

// const recommendData = [
//   {
//     id: "1-1",
//     img: `${base}products/gooseneck1.jpg`,
//     name: "咖啡島．島民手沖壺-300ml",
//     newPrice: 1200,
//     oldPrice: 1350
//   },
//   {
//     id: "1-2",
//     img: `${base}products/gooseneck2.jpg`,
//     name: "咖啡島．島民手沖壺-300ml",
//     newPrice: 1000,
//     oldPrice: 1350
//   },
//   {
//     id: "1-3",
//     img: `${base}products/gooseneck3.jpg`,
//     name: "咖啡島．島民手沖壺-300ml",
//     newPrice: 890,
//     oldPrice: 1350
//   }
// ];

const recommendData = [products[1], products[4], products[7]]

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const currentProduct = products.find((item) => item.id === id);
  const localizedIntro = language === "zh-TW" ? currentProduct.intro : currentProduct.introEN;
  const localizedDescription = language === "zh-TW" ? currentProduct.description : currentProduct.descriptionEN;
  const localizedSpecs = language === "zh-TW" ? currentProduct.specs : currentProduct.specsEN;
  const { isLoggedIn } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(currentProduct.colors?.[0] || "");
  const [currentImage, setCurrentImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const [favoriteProducts, setFavoriteProducts] = useState(
    currentUser?.favorite.products || []
  );
  const { snackbarMsg } = useContext(AuthContext);
  localStorage.setItem("currentPath", location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 收藏資料的 key
  const FAVORITE_KEY = "favoriteProducts";
  // 檢查目前商品是否收藏
  const getIsFavorite = () => {
    const favoriteList = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
    return favoriteList.includes(currentProduct.id);
  };
  const [isFavorite, setIsFavorite] = useState(getIsFavorite());

  // 處理愛心點擊
  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      setMsg("要先登入會員唷！");
      setOpenSnackbar(true);
      return;
    }
    let favoriteList = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
    let updatedFavorite;
    if (favoriteList.includes(currentProduct.id)) {
      updatedFavorite = favoriteList.filter(id => id !== currentProduct.id);
      setMsg(t("snackbar.remove"));
      setOpenSnackbar(true);
    } else {
      updatedFavorite = [...favoriteList, currentProduct.id];
      setMsg(t("snackbar.favorite"));
      setOpenSnackbar(true);
    }
    const updatedUser = { ...currentUser };
    updatedUser.favorite.products = updatedFavorite;
    const users = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = users.map((user) => {
      if (user.userEmail === currentUser.userEmail) {
        return {
          ...updatedUser,
        };
      }
      return user;
    });
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorite));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsFavorite(updatedFavorite.includes(currentProduct.id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % descData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (snackbarMsg) {
      setOpenSnackbar(true);
      setMsg(snackbarMsg);
    } else {
      setOpenSnackbar(false);
    }
  }, [snackbarMsg]);

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // 加入購物車（含動畫、未登入提示）
  const handleAddToCart = (e) => {
    if (!isLoggedIn) {
      setMsg("要先登入會員唷！");
      setOpenSnackbar(true);
      return;
    }
    const newItem = { ...currentProduct, quantity, selectedColor };
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.selectedColor === newItem.selectedColor
    );
    if (existIndex !== -1) {
      cart[existIndex].quantity = (cart[existIndex].quantity || 1) + (newItem.quantity || 1);
    } else {
      cart.push({ ...newItem });
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEvent = new CustomEvent("cartUpdated", { detail: total });
    window.dispatchEvent(cartCountEvent);
    
    

    // 飛豆動畫
    const startElem = e.target;
    const start = startElem.getBoundingClientRect();
    const endIcon = document.querySelector("#cart-fly-target") || document.querySelector(".cartContainer");
    if (!endIcon) return;
    const end = endIcon.getBoundingClientRect();
    const bean = document.createElement("img");
    bean.src = `${base}products/coffeeBeanLight.svg`;
    bean.className = "fly-bean-anim";
    document.body.appendChild(bean);

    bean.style.left = `${start.left + start.width / 2 - 30}px`;
    bean.style.top = `${start.top + start.height / 2 - 30}px`;

    setTimeout(() => {
      bean.style.transform = `translate(${end.left + end.width / 2 - (start.left + start.width / 2)}px, ${end.top + end.height / 2 - (start.top + start.height / 2)}px) scale(0.15) rotate(720deg)`;
      bean.style.opacity = "0";
    }, 20);

    setTimeout(() => {
      bean.remove();
    }, 1200);
  };

  // 直接購買
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setMsg("要先登入會員唷！");
      setOpenSnackbar(true);
      return;
    }
  
    const newItem = { ...currentProduct, quantity, selectedColor };
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    // 加入或更新商品
    const existIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.selectedColor === newItem.selectedColor
    );
    if (existIndex !== -1) {
      cart[existIndex].quantity = (cart[existIndex].quantity || 1) + (newItem.quantity || 1);
    } else {
      cart.push({ ...newItem });
    }
  
    // 儲存回 localStorage
    localStorage.setItem("cartItems", JSON.stringify(cart));
  
    //更新購物籃數量
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEvent = new CustomEvent("cartUpdated", { detail: total });
    window.dispatchEvent(cartCountEvent);
  
    // 導向購物車
    navigate(`${base}cart`);
  };
  

  const handlePrev = () => {
    setCurrentImage((prev) =>
      (prev - 1 + (currentProduct.images ? currentProduct.images.length : 1))
      % (currentProduct.images ? currentProduct.images.length : 1)
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      (prev + 1) % (currentProduct.images ? currentProduct.images.length : 1)
    );
  };

  const productImages = currentProduct.images || [currentProduct.image, currentProduct.hoverImage];
  const { t } = useTranslation();

  const toggleFavorite = (cafe, event, type, productId) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    event.stopPropagation();
    if (isLoggedIn) {
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUser = { ...currentUser };
      if (type === "product") {
        let favoriteList =
          JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        let updatedFavorite;
        if (favoriteList.includes(productId)) {
          updatedFavorite = favoriteList.filter((id) => id !== productId);
          updatedUser.favorite.products = updatedUser.favorite.products.filter(
            (item) => item !== productId
          );
          setFavoriteProducts(updatedUser.favorite.products);
          setMsg(t("snackbar.remove"));
          setOpenSnackbar(true);
        } else {
          updatedFavorite = [...favoriteList, productId];
          setMsg(t("snackbar.favorite"));
          setOpenSnackbar(true);
        }
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(updatedFavorite)
        );
        updatedUser.favorite.products = updatedFavorite;
      }
      const updatedUsers = users.map((user) => {
        if (user.userEmail === currentUser.userEmail) {
          return {
            ...updatedUser,
          };
        }
        return user;
      });
      console.log(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentUser(updatedUser); // 觸發 re-render
    } else {
      setMsg(t("snackbar.loginToAdd"));
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div id="fly-bean" className="fly-bean"></div>
      <div className="product-detail-page">
        <div className="left">
          <div className="carousel">
            <img src={productImages[currentImage]} alt="product" />
            <div className="carousel-controls">
              <button onClick={handlePrev}>&lt;</button>
              <button onClick={handleNext}>&gt;</button>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="title">
            <h2>
              <span className="highlight">{language === 'zh-TW' ? currentProduct.nameZH : currentProduct.nameEN}</span>
            </h2>
            {/* ❤️ 愛心收藏按鈕 */}
            <div
              className="heart-wrapper"
              // style={{ marginBottom: "16px", width: "40px", cursor: "pointer" }}
              onClick={handleFavoriteClick}
            >
              <img
                src={
                  isFavorite
                    ? `${base}products/icon-heart-red.svg`
                    : `${base}products/icon-heart-white.svg`
                }
                alt="favorite"
              />
            </div>
          </div>

          {/* 可以加上描述資料 */}
          <ul className="description">
            {localizedDescription && localizedDescription.length > 0 ? (
              localizedDescription.map((line, i) => <li key={i}>• {line}</li>)
            ) : (
              <li>{language === "zh-TW" ? "暫無詳細說明" : "No description available"}</li>
            )}
          </ul>

          <div className="quantity">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>－</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>＋</button>
          </div>

          <div className="price">
            {t("products.discount")}：<span className="highlight">NT${currentProduct.price}</span>
            <span className="old">{t("products.original")}：NT${currentProduct.oldPrice}</span>
          </div>

          <div className="actions">
            <button className="buy" onClick={handleBuyNow}>{t("products.buy")}</button>
            <button className="add" onClick={handleAddToCart}>{t("products.addToCart")}</button>
          </div>

        </div>
      </div>
      <div className="see-more-wrapper">
        <span className="see-more-text">查看更多</span>
        <img
          src={`${base}products/arrow.svg`}
          alt="arrow"
          className="see-more-arrow"
        />
      </div>



      <div className="product-extra-info">
        <section className="product-specs">
          <div className="specs-container">
            <div className="description">
              <h3>{t("products.feature")}</h3>
              {/* 商品介紹文案 */}
              <p>
                {localizedIntro}
              </p>
              <ul>
                {localizedDescription && localizedDescription.map((line, idx) => (
                  <li key={idx}>• {line}</li>
                ))}
              </ul>
              {/* 商品介紹圖片區塊 */}
              <div className="desc-images">
                {currentProduct.descImages && currentProduct.descImages.map((img, idx) => (
                  <div className="desc-image-wrapper" key={idx}>
                    <img src={img} alt={`商品圖${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="spec-table">
              <h3>{t("products.spec")}</h3>
              <table>
                <tbody>
                  {localizedSpecs && Object.entries(localizedSpecs).map(([key, value], idx) => (
                    <tr key={idx}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </section>
      </div>

      <section className="recommended-products">
        <div className="recommend-title">
          {t("products.recommendTitle")}
          <img src={`${base}products/prodRecoMs.png`} alt="薦" className="prodRecoMs" />
        </div>
        <div className="recommend-cards">
          {recommendData.map((product, index) =>{
            const isFavorite =
              currentUser.favorite?.products.some(
                (item) => item === product.id
              );

            return (
              <ProductCard
                key={index}
                id={product.id}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            );
          })}
        </div>
      </section>



      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ right: { xs: 70, sm: 70 } }}
      >
        <Alert
          severity="success"
          onClose={handleSnackBarClose}
          sx={{
            backgroundColor: "#a46230",
            color: "#fff",
            fontWeight: 600,
            fontSize: "15px",
            alignItems: "center"
          }}
          variant="filled"
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductPage;
