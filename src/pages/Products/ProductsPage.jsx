import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductsPage.scss";

// 假資料區
const mockProduct = {
  name: "泰摩咖啡 Bricks電動家用磨豆機 黑色",
  price: 1680,
  oldPrice: 2000,
  description: [
    "研磨刀盤磨豆結構",
    "一鍵啟動，使用簡單又便利",
    "可選擇杯份磨豆",
  ],
  colors: ["#000000", "#ffffff", "#a0522d"],
  images: ["/products/gooseneck1Hover.jpg", "/products/gooseneck1Des1.jpg"],
};

const descData = [
  { img: "/products/gooseneck1Des3.jpg", title: "散熱口設計", desc: "快速散熱" },
  { img: "/products/gooseneck1Des2.jpg", title: "轉速調節", desc: "手動調整刀盤轉速" },
  { img: "/products/gooseneck1Hover.jpg", title: "金屬拋光開關", desc: "開關按鈕觸感升級" },
];

const recommendData = [
  { img: "/products/gooseneck1.jpg", name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
  { img: "/products/gooseneck2.jpg", name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
  { img: "/products/gooseneck3.jpg", name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [currentImage, setCurrentImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % descData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = () => {
    const newItem = {
      ...mockProduct,
      quantity,
      selectedColor,
    };
    const existing = JSON.parse(localStorage.getItem("cartItems")) || [];
    localStorage.setItem("cartItems", JSON.stringify([...existing, newItem]));
    navigate("/cart");
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + descData.length) % descData.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % descData.length);
  };

  const visibleCards = [
    descData[startIndex % descData.length],
    descData[(startIndex + 1) % descData.length],
    descData[(startIndex + 2) % descData.length],
  ];

  return (
    <>
      {/* 第一部分：商品主圖 + 商品資訊 */}
      <div className="product-detail-page">
        <div className="left">
          <div className="carousel">
            <img src={mockProduct.images[currentImage]} alt="product" />
            <div className="carousel-controls">
              <button onClick={() => setCurrentImage((currentImage - 1 + mockProduct.images.length) % mockProduct.images.length)}>&lt;</button>
              <button onClick={() => setCurrentImage((currentImage + 1) % mockProduct.images.length)}>&gt;</button>
            </div>
          </div>
        </div>

        <div className="right">
          <h2>
            <span className="highlight">泰摩咖啡</span> Bricks電動家用磨豆機 黑色
          </h2>

          <ul className="description">
            {mockProduct.description.map((line, i) => (
              <li key={i}>• {line}</li>
            ))}
          </ul>

          <div className="quantity">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>－</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>＋</button>
          </div>

          <div className="price">
            折扣價：<span className="highlight">NT${mockProduct.price}</span>
            <span className="old">原價：NT${mockProduct.oldPrice}</span>
          </div>

          <div className="actions">
            <button className="buy" onClick={handleBuyNow}>直接購買</button>
            <button className="add">加入購物車</button>
          </div>
        </div>
      </div>

      {/* 第二～四部分：商品敘述、輪播、推薦 */}
      <div className="product-extra-info">

        {/* 第二部分：商品文字敘述 */}
        <section className="product-specs">
          <div className="specs-container">
            <div className="description">
              <h3>商品介紹</h3>
              <p>
                Bricks 電動家用磨豆機具備專業級磨豆結構，一鍵啟動設計簡單好上手，
                無論是日常手沖還是義式濃縮都能輕鬆勝任。
              </p>
              <ul>
                <li>可調整刀盤轉速，因應不同烘焙度的咖啡豆</li>
                <li>金屬開關搭配防滑設計，操控手感再升級</li>
                <li>散熱快、不卡豆，低噪音運轉</li>
              </ul>

              {/* 下方兩張圖左右排列 */}
              <div className="desc-images">
                <div className="desc-image-wrapper">
                  <img src="/products/gooseneck1Des3.jpg" alt="商品圖1" />
                </div>
                <div className="desc-image-wrapper">
                  <img src="/products/gooseneck1Des2.jpg" alt="商品圖2" />
                </div>
              </div>
            </div>


            <div className="spec-table">
              <h3>商品規格</h3>
              <table>
                <tbody>
                  <tr><td>商品名稱</td><td>泰摩咖啡 魚04鶴嘴手沖壺</td></tr>
                  <tr><td>品牌</td><td>TIMEMORE 泰摩咖啡</td></tr>
                  <tr><td>型號</td><td>Fish Youth 04</td></tr>
                  <tr><td>顏色</td><td>霧黑／太空灰（以實際販售為主）</td></tr>
                  <tr><td>材質</td><td>壺身：304 不鏽鋼<br />握把：酚醛樹脂</td></tr>
                  <tr><td>表面處理</td><td>耐高溫塗層，霧面防刮</td></tr>
                  <tr><td>容量</td><td>約 600ml</td></tr>
                  <tr><td>尺寸</td><td>約 23 × 9 × 13 cm</td></tr>
                  <tr><td>重量</td><td>約 540g</td></tr>
                  <tr><td>適用熱源</td><td>不適用於電磁爐／直火，建議注入熱水</td></tr>
                  <tr><td>產地</td><td>中國（原廠製造）</td></tr>
                  <tr><td>其他特色</td><td>魚型鶴嘴設計，控水精準</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 第三部分：商品描述輪播
        <section className="product-description-carousel">
          <div className="carousel-viewport">
            <div className="carousel-track">
              {visibleCards.map((item, idx) => (
                <div className="carousel-card" key={idx}>
                  <img src={item.img} alt={item.title} />
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* 第四部分：推薦商品 */}
        <section className="recommended-products">
          <div className="recommend-title">
            咖啡人還會這樣搭配
            <img src="/products/prodRecoMs.png" alt="薦" className="prodRecoMs" />
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
      </div>
    </>
  );
}

export default ProductPage;
