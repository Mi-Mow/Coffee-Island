import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductsPage.scss";
import { products } from "./Products";
const base = import.meta.env.BASE_URL;

const descData = [
  { img: `${base}products/gooseneck1Des3.jpg`, title: "散熱口設計", desc: "快速散熱" },
  { img: `${base}products/gooseneck1Des2.jpg`, title: "轉速調節", desc: "手動調整刀盤轉速" },
  { img: `${base}products/gooseneck1Hover.jpg`, title: "金屬拋光開關", desc: "開關按鈕觸感升級" },
];

const recommendData = [
  { img: `${base}products/gooseneck1.jpg`, name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
  { img: `${base}products/gooseneck2.jpg`, name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
  { img: `${base}products/gooseneck3.jpg`, name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentProduct = products.find((item) => item.id === id);

  // Fallback 預防找不到商品
  // if (!currentProduct) {
  //   return <div style={{ padding: 60, textAlign: 'center' }}>查無此商品 🙇‍♂️</div>;
  // }

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(currentProduct.colors?.[0] || "");
  const [currentImage, setCurrentImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % descData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = () => {
    const newItem = { ...currentProduct, quantity, selectedColor };
    const existing = JSON.parse(localStorage.getItem("cartItems")) || [];
    localStorage.setItem("cartItems", JSON.stringify([...existing, newItem]));
    navigate(`${base}cart`);
  };

  const handleAddToCart = (e) => {
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

    // 更新購物車數字（原本有的就繼續加）
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEvent = new CustomEvent("cartUpdated", { detail: total });
    window.dispatchEvent(cartCountEvent);

    // ✅ 飛豆動畫
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

  // 若沒有 images 就 fallback 用 main image
  const productImages = currentProduct.images || [currentProduct.image, currentProduct.hoverImage];

  return (
    <>
      {/* 用來放飛行動畫 */}
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
          <h2>
            <span className="highlight">{currentProduct.name}</span>
          </h2>

          {/* 可以加上描述資料 */}
          <ul className="description">
            {currentProduct.description
              ? currentProduct.description.map((line, i) => <li key={i}>• {line}</li>)
              : <li>暫無詳細說明</li>}
          </ul>

          <div className="quantity">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>－</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>＋</button>
          </div>

          <div className="price">
            折扣價：<span className="highlight">NT${currentProduct.price}</span>
            <span className="old">原價：NT${currentProduct.oldPrice}</span>
          </div>

          <div className="actions">
            <button className="buy" onClick={handleBuyNow}>直接購買</button>
            <button className="add" onClick={handleAddToCart}>加入購物車</button>
          </div>
        </div>
      </div>

      <div className="product-extra-info">
        <section className="product-specs">
          <div className="specs-container">
            <div className="description">
              <h3>商品介紹</h3>
              {/* 商品介紹文案 */}
              <p>
                {currentProduct.intro}
              </p>
              {/* 商品特色列表 */}
              <ul>
                {currentProduct.description && currentProduct.description.map((line, idx) => (
                  <li key={idx}>{line}</li>
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
              <h3>商品規格</h3>
              <table>
                <tbody>
                  {currentProduct.specs && Object.entries(currentProduct.specs).map(([key, value], idx) => (
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
          咖啡人還會這樣搭配
          <img src={`${base}products/prodRecoMs.png`} alt="薦" className="prodRecoMs" />
        </div>
        <div className="recommend-cards">
          {recommendData.map((item, idx) => (
            <div className="product-card" key={idx}>
              <span className="tag">優惠</span>
              <img src={item.img} alt={item.name} />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="price">
                  <span className="new-price">NT${item.newPrice}</span>
                  <span className="old-price">NT${item.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductPage;
