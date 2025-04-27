import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProductsPage.scss";
import productImage from "../../assets/history2.png"; // 換成你的圖片

const mockProduct = {
  name: "泰摩咖啡 Bricks電動家用磨豆機 黑色",
  price: 1680,
  oldPrice: 2000,
  description: [
    "研磨刀盤磨豆結構",
    "一鍵啟動，使用簡單又便利",
    "可選擇杯份磨豆"
  ],
  colors: ["#000000", "#ffffff", "#a0522d"], // 黑 白 棕
};

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);

  const handleBuyNow = () => {
    navigate("/cart");
  };

  return (
    <div className="product-detail-page">
      <div className="left">
        <img src={productImage} alt="product" />
      </div>
      <div className="right">
        <h2>{mockProduct.name}</h2>
        <ul className="description">
          {mockProduct.description.map((line, i) => (
            <li key={i}>• {line}</li>
          ))}
        </ul>

        <div className="colors">
          <p>顏色</p>
          <div className="color-options">
            {mockProduct.colors.map((color, i) => (
              <span
                key={i}
                className={`dot ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="quantity">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>－</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>＋</button>
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

export default ProductPage;
