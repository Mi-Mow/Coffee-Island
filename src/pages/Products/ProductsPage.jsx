import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductsPage.scss";
import gooseneck1 from "../../assets/products/gooseneck1.png";
import gooseneck2 from "../../assets/products/gooseneck2.png";
import gooseneck3 from "../../assets/products/gooseneck3.png";
import prodRecoMs from "../../assets/products/prodRecoMs.png"

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
  images: [gooseneck1, gooseneck2, gooseneck3],
};

const descData = [
  { img: gooseneck1, title: "散熱口設計", desc: "快速散熱" },
  { img: gooseneck2, title: "轉速調節", desc: "手動調整刀盤轉速" },
  { img: gooseneck3, title: "金屬拋光開關", desc: "開關按鈕觸感升級" },
];

const recommendData = [
  { img: gooseneck1, name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
  { img: gooseneck2, name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
  { img: gooseneck3, name: "咖啡島．島民手沖壺-300ml", newPrice: 650, oldPrice: 1390 },
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [currentImage, setCurrentImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  // 第三部分：商品簡介輪播圖
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % descData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = () => {
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

      {/* 第二部分：！！！！我還沒想好要怎麼寫，求放過！！！！！！ */}
      <div className="product-extra-info">
        <section className="product-specs"></section>

        {/* 第三步份：商品描述輪播 */}
        <section className="product-description-carousel">

        <div className="arrow-wrapper left">
              <button className="arrow" onClick={handlePrev}>&lt;</button>
            </div>

          <div className="carousel-viewport">
            {/* 向左箭頭 */}


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
              {/* 向右箭頭 */}
              <div className="arrow-wrapper right">
              <button className="arrow" onClick={handleNext}>&gt;</button>
            </div>

        </section>

        {/* 第四部分：推薦商品區塊 */}
        <section className="recommended-products">
          <div className="recommend-title">
            咖啡人還會這樣搭配
            <img src={prodRecoMs} alt="薦" className="prodRecoMs" />
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
