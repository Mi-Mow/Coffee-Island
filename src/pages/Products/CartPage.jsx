import { useState, useEffect } from "react";
import "./CartPage.scss";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-page">
      {/* 步驟導覽條 */}
      <div className="step-progress">
        <div className="step active">1 確認商品項目</div>
        <div className="step">2 配送付款資訊</div>
        <div className="step">3 預定明細確認</div>
        <div className="step">4 預定完成</div>
      </div>

      <h2 className="cart-title">預定區訂單</h2>

      <div className="cart-content">
        {/* 商品區塊 */}
        <div className="cart-list">
          <div className="cart-header">
            <span>產品規格</span>
            <span>單價</span>
            <span>數量</span>
          </div>

          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.images[0]} alt={item.name} />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="spec">規格　黑色</div>
              </div>
              <div className="price">${item.price}</div>
              <div className="quantity-control">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <button className="remove">×</button>
            </div>
          ))}
        </div>

        {/* 摘要區塊 */}
        <div className="cart-summary">
          <h3 className="summary-title">預訂摘要</h3>
          <div className="summary-line">
            <span>金額小計</span>
            <span className="total-price">NT${total}</span>
          </div>
          <div className="summary-line total-line">
            <span>總額金額</span>
            <span className="total-price red">NT${total}</span>
          </div>
          <div className="button-group">
            <button className="next">下一步</button>
            <button className="keep">繼續選購</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;