import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.scss";
const base = import.meta.env.BASE_URL;

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pay: "取貨付款",
    invoice: "實體發票",
    carrier: "",
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, (updated[index].quantity || 1) + delta);
    updateLocalStorage(updated);
  };

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    updateLocalStorage(updated);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleStep2Submit = () => {
    const pay = document.querySelector('input[name="pay"]:checked')?.nextSibling?.textContent.trim();
    const invoiceRadio = document.querySelector('input[name="invoice"]:checked');
    const invoice = invoiceRadio?.nextSibling?.textContent.trim();
    const carrierInput = invoiceRadio?.parentElement.querySelector('input[type="text"]');
    const carrier = carrierInput?.value || "";

    const inputs = document.querySelectorAll(".recipient-info input");
    const [nameInput, phoneInput, emailInput, addressInput] = inputs;

    setFormData({
      pay,
      invoice,
      carrier,
      name: nameInput?.value || "",
      phone: phoneInput?.value || "",
      email: emailInput?.value || "",
      address: addressInput?.value || ""
    });
    setStep(3);
  };

  const handleConfirm = () => {
    setStep(4);
  };

  return (
    <div className="cart-page">
      {/* 步驟導覽條 */}
      <div className="step-progress">
        {[1, 2, 3, 4].map((num, i) => (
          <div className={`step-wrapper ${num === step ? "active" : ""}`} key={i}>
            <div className="circle">{num}</div>
            <span className="label">
              {["確認商品項目", "配送付款資訊", "預定明細確認", "預定完成"][i]}
            </span>
          </div>
        ))}
      </div>

      <h2 className="cart-title">預定區訂單</h2>

      {/* step 1: 確認商品項目 */}
      {step === 1 && (
        <div className="cart-content">
          <div className="cart-list">
            <div className="cart-header">
              <span></span>
              <span>產品規格</span>
              <span>單價</span>
              <span>數量</span>
              <span></span>
            </div>
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.images[0]} alt={item.name} />
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="spec">規格　{item.selectedColor || "黑色"}</div>
                </div>
                <div className="price">${item.price}</div>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(index, -1)}>－</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>＋</button>
                </div>
                <button className="remove" onClick={() => handleRemove(index)}>×</button>
              </div>
            ))}
          </div>
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
              <button className="next" onClick={() => setStep(2)}>下一步</button>
              <button className="keep" onClick={() => navigate(`${base}products`)}>繼續選購</button>
            </div>
          </div>
        </div>
      )}

      {/* step 2: 配送付款資訊 */}
      {step === 2 && (
        <div className="cart-content">
          <div className="cart-list form-list">
            {/* 配送付款資訊 */}
            <div className="form-section">
              <div className="form-title">配送付款資訊</div>
              <label><input type="radio" name="pay" /> 線上刷卡 <span>支持分期付款</span></label>
              <label><input type="radio" name="pay" /> 轉帳</label>
              <label><input type="radio" name="pay" defaultChecked /> 取貨付款</label>
            </div>

            <hr />

            {/* 發票資訊 */}
            <div className="form-section">
              <div className="form-title">發票資訊</div>
              <div className="radio-with-input">
                <label><input type="radio" name="invoice" /> 手機條碼載具</label>
                <input type="text" />
              </div>
              <label><input type="radio" name="invoice" /> 電子發票</label>
              <label><input type="radio" name="invoice" defaultChecked /> 實體發票</label>
            </div>

            <hr />

            {/* 收件人資訊 */}
            <div className="form-section">
              <div className="form-title">收件人資訊</div>
              <div className="recipient-info">
                <label>姓名</label><input type="text" />
                <label>電話</label><input type="text" />
                <label>電子信箱</label><input type="email" />
                <label>地址</label><input type="text" />
              </div>
            </div>
          </div>

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
              <button className="next" onClick={handleStep2Submit}>下一步</button>
              <button className="keep" onClick={() => setStep(1)}>返回上一步</button>
            </div>
          </div>
        </div>
      )}

      {/* step 3: 預定明細確認（資訊移到商品清單下） */}
      {step === 3 && (
        <div className="cart-content">
          <div className="cart-list">
            <div className="cart-header">
              <span></span>
              <span>產品規格</span>
              <span>單價</span>
              <span>數量</span>
            </div>
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.images[0]} alt={item.name} />
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="spec">規格　{item.selectedColor || "黑色"}</div>
                </div>
                <div className="price">${item.price}</div>
                <div className="quantity-control">
                  <span>{item.quantity || 1}</span>
                </div>
              </div>
            ))}
            {/* 顯示表單資料 */}
            <div className="order-info">
              <div className="label">付款方式：</div>
              <div className="value">{formData.pay}</div>

              <div className="label">收件人姓名：</div>
              <div className="value">{formData.name}</div>

              <div className="label">電話：</div>
              <div className="value">{formData.phone}</div>

              <div className="label">電子信箱：</div>
              <div className="value">{formData.email}</div>

              <div className="label">地址：</div>
              <div className="value">{formData.address}</div>

              <div className="label">發票資訊：</div>
              <div className="value">
                {formData.invoice}
                {formData.invoice === "手機條碼載具" && `：${formData.carrier}`}
              </div>
            </div>

          </div>

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
              <button className="next" onClick={handleConfirm}>確認訂單</button>
              <button className="keep" onClick={() => setStep(2)}>返回上一步</button>
            </div>
          </div>
        </div>
      )}

      {/* step 4: 完成畫面 */}
      {step === 4 && (
        <div className="order-complete">
          <h2>感謝您的預訂！</h2>
          <p>我們已收到您的訂單，請至電子信箱查看確認信。</p>
          <button className="keep" onClick={() => navigate(`${base}`)}>返回首頁</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
