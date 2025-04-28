import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProductsPage.scss";
import history1 from "../../assets/history2.png";
import history2 from "../../assets/history2.png";
import history3 from "../../assets/history2.png";

const mockProduct = {
  name: "泰摩咖啡 Bricks電動家用磨豆機 黑色",
  price: 1680,
  oldPrice: 2000,
  description: [
    "研磨刀盤磨豆結構",
    "一鍵啟動，使用簡單又便利",
    "可選擇杯份磨豆"
  ],
  colors: ["#000000", "#ffffff", "#a0522d"],
  images: [history1, history2, history3],
};

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [currentImage, setCurrentImage] = useState(0);

  const handleBuyNow = () => {
    navigate("/cart");
  };

  return (
    <div className="product-detail-page">
      <div className="left">
        <div className="carousel">
          <img src={mockProduct.images[currentImage]} alt="product" />
          <div className="carousel-controls">
            <button onClick={() => setCurrentImage((currentImage - 1 + mockProduct.images.length) % mockProduct.images.length)}>&lt;</button>
            <button onClick={() => setCurrentImage((currentImage + 1) % mockProduct.images.length)}>&gt;</button>
          </div>
        </div>
        <div className="dots">
          {mockProduct.images.map((_, i) => (
            <span
              key={i}
              className={currentImage === i ? "active" : ""}
              onClick={() => setCurrentImage(i)}
            />
          ))}
        </div>
      </div>

      <div className="right">
        <h2>
          <span className="highlight">泰摩咖啡</span>{" "}
          Bricks電動家用磨豆機 黑色
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
  );
}
<div className="product-extra-info">

{/* 商品規格(我還不知道要怎麼設計QQ) */}
<section className="product-specs">
  <div className="empty-block">
    {/* 商品規格區塊（這裡留空，未來可以填內容） */}
  </div>
</section>

</div>


export default ProductPage;
