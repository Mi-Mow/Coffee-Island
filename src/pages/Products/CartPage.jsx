import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.scss";
import Confetti from 'react-confetti';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


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
  const handleConfirm = () => {
    setStep(4);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);

    //cartUpdated 事件，讓 Header 更新購物車數量
    const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEvent = new CustomEvent("cartUpdated", { detail: total });
    window.dispatchEvent(cartCountEvent);
  };


  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    const newQuantity = (updated[index].quantity || 1) + delta;
    if (newQuantity <= 0) {
      // 數量變成 0，直接刪除該商品
      updated.splice(index, 1);
    } else {
      updated[index].quantity = newQuantity;
    }
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

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [formShake, setFormShake] = useState(false);

  const handleStep2Submit = () => {
    const pay = document.querySelector('input[name="pay"]:checked')?.nextSibling?.textContent.trim();
    const invoiceRadio = document.querySelector('input[name="invoice"]:checked');
    const invoice = invoiceRadio?.nextSibling?.textContent.trim();
    const carrierInput = invoiceRadio?.parentElement.querySelector('input[type="text"]');
    const carrier = carrierInput?.value || "";

    const inputs = document.querySelectorAll(".recipient-info input");
    const [nameInput, phoneInput, emailInput, addressInput] = inputs;

    // 驗證
    if (
      !pay ||
      !invoice ||
      !nameInput?.value.trim() ||
      !phoneInput?.value.trim() ||
      !emailInput?.value.trim() ||
      !addressInput?.value.trim()
    ) {
      setSnackbarMsg("請完整填寫所有必填欄位");
      setOpenSnackbar(true);
      setFormShake(true);
      setTimeout(() => setFormShake(false), 400);
      return;
    }

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

  return (
    <div className="cart-page">
      {/* 步驟導覽條 */}
      <div className="step-progress">
        <div className={`step-block show-mobile`}>
          <div className={`step-wrapper ${step === 1 ? "active" : ""}`}>
            <div className="circle">1</div>
            <span className="label">確認商品</span>
          </div>
          <div className={`step-bar ${step > 1 ? "filled" : ""}`}></div>
        </div>
        <div className={`step-block ${step >= 2 ? "show-mobile" : ""}`}>
          <div className={`step-wrapper ${step === 2 ? "active" : ""}`}>
            <div className="circle">2</div>
            <span className="label">填寫資料</span>
          </div>
          <div className={`step-bar ${step > 2 ? "filled" : ""}`}></div>
        </div>
        <div className={`step-block ${step >= 3 ? "show-mobile" : ""}`}>
          <div className={`step-wrapper ${step === 3 ? "active" : ""}`}>
            <div className="circle">3</div>
            <span className="label">訂單確認</span>
          </div>
          <div className={`step-bar ${step > 3 ? "filled" : ""}`}></div>
        </div>
        <div className={`step-block ${step >= 4 ? "show-mobile" : ""}`}>
          <div className={`step-wrapper ${step === 4 ? "active" : ""}`}>
            <div className="circle">4</div>
            <span className="label">完成</span>
          </div>
        </div>
      </div>



      <h2 className="cart-title">預定區訂單</h2>

      {/* step 1: 確認商品項目 */}
      {step === 1 && (
        <div className="cart-content">
          <div className="cart-list">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                購物車沒有東西，趕快去買吧！
              </div>
            ) : (
              <>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th colSpan={2}>產品名稱</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th>小計</th>
                      <th>刪除</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, idx) => (
                      <tr key={idx}>
                        <th className="img">
                          <img src={item.images?.[0] || item.image} alt={item.name} />
                        </th>
                        <th className="title">
                          <span className="name">{item.name}</span>
                          <div className="spec">規格 {item.selectedColor || '黑色'}</div>
                        </th>
                        <td data-title="單價">${item.price}</td>
                        <td data-title="數量">
                          <div className="quantity-control">
                            <button onClick={() => handleQuantityChange(idx, -1)}>－</button>
                            <span>{item.quantity || 1}</span>
                            <button onClick={() => handleQuantityChange(idx, 1)}>＋</button>
                          </div>
                        </td>
                        <td data-title="小計">${(item.price * (item.quantity || 1)).toLocaleString()}</td>
                        <td data-title="刪除">
                          <button className="remove" onClick={() => handleRemove(idx)}>×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>


              </>
            )}
          </div>
          <div className="cart-summary">
            <h3 className="summary-title">預訂摘要</h3>
            <div className="summary-line">
              <span>金額小計</span>
              <span className="total-price">NT${total}</span>
            </div>
            <div className="summary-line total-line">
              <span>運費</span>
              <span className="total-price red">
                NT${total >= 1000 ? 0 : 80}
              </span>
            </div>
            <div className="free-shipping-tip">
              滿1000元，全館免運
            </div>
            <div className="button-group">
              <button
                className="next"
                onClick={() => setStep(2)}
                disabled={cartItems.length === 0}
              >
                下一步
              </button>
              <button className="keep" onClick={() => navigate(`${base}products`)}>
                繼續選購
              </button>
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
              {/* <label><input type="radio" name="pay" /> 線上刷卡 <span>支持分期付款</span></label> */}
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
              {/* <label><input type="radio" name="invoice" /> 電子發票</label> */}
              <label><input type="radio" name="invoice" defaultChecked /> 實體發票</label>
            </div>

            <hr />

            {/* 收件人資訊 */}
            <div className="form-section">
              <div className="form-title">收件人資訊</div>
              <div className="recipient-info">
                <div className="recipient-info">
                  <div className="form-row">
                    <label><span className="required-star">*</span>姓名</label>
                    <input type="text" />
                  </div>
                  <div className="form-row">
                    <label><span className="required-star">*</span>電話</label>
                    <input type="text" />
                  </div>
                  <div className="form-row">
                    <label><span className="required-star">*</span>電子信箱</label>
                    <input type="email" />
                  </div>
                  <div className="form-row">
                    <label><span className="required-star">*</span>地址</label>
                    <input type="text" />
                  </div>
                </div>


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
              <span>運費</span>
              <span className="total-price red">NT${total >= 1000 ? 0 : 80}</span>
            </div>
            <div className="free-shipping-tip">
              滿1000元，全館免運
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
            <table className="cart-table table">
              <thead>
                <tr>
                  <th colSpan={2}>產品名稱</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <th className="img">
                      <img src={item.images?.[0] || item.image} alt={item.name} />
                    </th>
                    <th className="title">
                      <span className="name">{item.name}</span>
                      <div className="spec">規格 {item.selectedColor || "黑色"}</div>
                    </th>
                    <td data-title="單價">${item.price}</td>
                    <td data-title="數量">
                      <span>{item.quantity || 1}</span>
                    </td>
                    <td data-title="小計">
                      ${item.price * (item.quantity || 1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
              <span>運費</span>
              <span className="total-price red">
                NT${total >= 1000 ? 0 : 80}
              </span>
            </div>
            <div className="free-shipping-tip">
              滿1000元，全館免運
            </div>
            <div className="summary-line total-line">
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
          <img
            src={`${base}products/EndMonster.svg`}
            alt="EndMoster"
            className="endmoster-swing"
            style={{ width: 100, marginBottom: 20 }}
          />
          <div className="thankyou">
            <h2>感謝您的預訂！</h2>
            <p>我們已收到您的訂單，請至電子信箱查看確認信。</p>
          </div>
          <button className="keep" onClick={() => navigate(`${base}`)}>返回首頁</button>
        </div>
      )}

      {/* 第二步驟填資料，若無填寫完整の提示 */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ right: { xs: 90, sm: 90 } }}  // 小怪獸旁邊
      >
        <Alert
          severity="warning"
          sx={{
            backgroundColor: "#a46230",
            color: "#fff",
            fontWeight: 600,
            fontSize: "15px",
            alignItems: "center"
          }}
          variant="filled"
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>


    </div>

  );
}

export default CartPage;
