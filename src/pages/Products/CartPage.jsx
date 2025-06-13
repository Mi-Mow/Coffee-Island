import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.scss";
import Confetti from 'react-confetti';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CartSummary from "../../components/CartSummary/CartSummary";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

const base = import.meta.env.BASE_URL;

function CartPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pay: "cod",
    invoice: "physical",
    carrier: "",
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  // 這邊是要把下訂單的資料帶入訂單明細(說不想做，但還是帶入了)
  const handleConfirm = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

    const firstProduct = cartItems[0];
    const productName = cartItems.length === 1
      ? firstProduct.nameZH
      : `${firstProduct.nameZH} 等 ${cartItems.length} 項商品`;

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const newOrder = {
      date: formattedDate,
      payment: formData.pay === "cod" ? "取貨付款" : "轉帳",
      amount: totalAmount,
      status: "已完成",
      productList: cartItems.map((item) => ({
        nameZH: item.nameZH || item.name,
        nameEN: item.nameEN || item.name,
      }))
    };

    const updatedUser = {
      ...currentUser,
      orders: [...(currentUser.orders || []), newOrder]
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.removeItem("cartItems");
    setCartItems([]);

    // 確認訂單後，讓右上角的icon清空
    const cartCountEvent = new CustomEvent("cartUpdated", { detail: 0 });
    window.dispatchEvent(cartCountEvent);

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

    const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEvent = new CustomEvent("cartUpdated", { detail: total });
    window.dispatchEvent(cartCountEvent);
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...cartItems];
    const newQuantity = (updated[index].quantity || 1) + delta;
    if (newQuantity <= 0) {
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
    const pay = document.querySelector('input[name="pay"]:checked')?.value;
    const invoiceRadio = document.querySelector('input[name="invoice"]:checked');
    const invoice = invoiceRadio?.value;
    const carrierInput = invoiceRadio?.parentElement.querySelector('input[type="text"]');
    const carrier = carrierInput?.value || "";

    const inputs = document.querySelectorAll(".recipient-info input");
    const [nameInput, phoneInput, emailInput, addressInput] = inputs;

    if (
      !pay ||
      !invoice ||
      !nameInput?.value.trim() ||
      !phoneInput?.value.trim() ||
      !emailInput?.value.trim() ||
      !addressInput?.value.trim()
    ) {
      setSnackbarMsg(t("cart.warning.incomplete"));
      setOpenSnackbar(true);
      setFormShake(true);
      setTimeout(() => setFormShake(false), 400);
      return;
    }

    setFormData({
      pay,
      invoice,
      carrier,
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value
    });

    setStep(3);
  };


  return (
    <div className="cart-page">
      <div className="step-progress">
        <div className={`step-block show-mobile`}>
          <div className={`step-wrapper ${step === 1 ? "active" : ""}`}>
            <div className="circle">1</div>
            <span className="label">{t("cart.steps.confirm")}</span>
          </div>
          <div className={`step-bar ${step > 1 ? "filled" : ""}`}></div>
        </div>
        <div className={`step-block ${step >= 2 ? "show-mobile" : ""}`}>
          <div className={`step-wrapper ${step === 2 ? "active" : ""}`}>
            <div className="circle">2</div>
            <span className="label">{t("cart.steps.fill")}</span>
          </div>
          <div className={`step-bar ${step > 2 ? "filled" : ""}`}></div>
        </div>
        <div className={`step-block ${step >= 3 ? "show-mobile" : ""}`}>
          <div className={`step-wrapper ${step === 3 ? "active" : ""}`}>
            <div className="circle">3</div>
            <span className="label">{t("cart.steps.review")}</span>
          </div>
          <div className={`step-bar ${step > 3 ? "filled" : ""}`}></div>
        </div>
        <div className={`step-block ${step >= 4 ? "show-mobile" : ""}`}>
          <div className={`step-wrapper ${step === 4 ? "active" : ""}`}>
            <div className="circle">4</div>
            <span className="label">{t("cart.steps.complete")}</span>
          </div>
        </div>
      </div>

      <h2 className="cart-title">{t("cart.title")}</h2>


      {step === 1 && (
        <div className="cart-content">
          <div className="cart-list">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                {t("cart.empty")}
              </div>
            ) : (
              <>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th colSpan={2}>{t("cart.table.product")}</th>
                      <th>{t("cart.table.price")}</th>
                      <th>{t("cart.table.qty")}</th>
                      <th>{t("cart.table.subtotal")}</th>
                      <th>{t("cart.table.remove")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, idx) => (
                      <tr key={idx}>
                        <th className="img">
                          <img src={item.images?.[0] || item.image} alt={item.name} />
                        </th>
                        <th className="title">
                          <span className="name">{language === "zh-TW" ? item.nameZH : item.nameEN}</span>
                        </th>
                        <td data-title={t("cart.table.price")}>${item.price}</td>
                        <td data-title={t("cart.table.qty")}>
                          <div className="quantity-control">
                            <button onClick={() => handleQuantityChange(idx, -1)}>－</button>
                            <span>{item.quantity || 1}</span>
                            <button onClick={() => handleQuantityChange(idx, 1)}>＋</button>
                          </div>
                        </td>
                        <td data-title={t("cart.table.subtotal")}>
                          ${(item.price * (item.quantity || 1)).toLocaleString()}
                        </td>
                        <td data-title={t("cart.table.remove")}>
                          <button className="remove" onClick={() => handleRemove(idx)}>×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <CartSummary
            total={total}
            onNext={() => setStep(2)}
            onBack={() => navigate(`${base}products`)}
            disableNext={cartItems.length === 0}
            nextLabel={t("cart.button.next")}
            backLabel={t("cart.button.continue")}
          />
        </div>
      )}




      {/* step 2: 配送付款資訊 */}
      {step === 2 && (
        <div className="cart-content">
          <div className="cart-list form-list">
            {/* 配送付款資訊 */}
            <div className="form-section">
              <div className="form-title">{t("cart.section.shipping")}</div>
              <div className="radio-with-input">
                <label>
                  <input type="radio" name="pay" value="transfer" />
                  {t("cart.payment.transfer")}
                </label>
                <label>
                  <input type="radio" name="pay" value="cod" defaultChecked />
                  {t("cart.payment.cod")}
                </label>
              </div>
            </div>

            <hr />

            {/* 發票資訊 */}
            <div className="form-section">
              <div className="form-title">{t("cart.section.invoice")}</div>
              <div className="radio-with-input">
                <label>
                  <input type="radio" name="invoice" value="mobile" />
                  {t("cart.invoice.mobile")}
                </label>
                <label>
                  <input type="radio" name="invoice" value="physical" defaultChecked />
                  {t("cart.invoice.physical")}
                </label>
              </div>
            </div>

            <hr />

            {/* 收件人資訊 */}
            <div className="form-section">
              <div className="form-title">{t("cart.section.recipient")}</div>
              <div className="recipient-info">
                <div className="form-row">
                  <label><span className="required-star">*</span>{t("cart.form.name")}</label>
                  <input type="text" />
                </div>
                <div className="form-row">
                  <label><span className="required-star">*</span>{t("cart.form.phone")}</label>
                  <input type="text" />
                </div>
                <div className="form-row">
                  <label><span className="required-star">*</span>{t("cart.form.email")}</label>
                  <input type="email" />
                </div>
                <div className="form-row">
                  <label><span className="required-star">*</span>{t("cart.form.address")}</label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <CartSummary
            total={total}
            onNext={handleStep2Submit}
            onBack={() => setStep(1)}
            nextLabel={t("cart.button.next")}
            backLabel={t("cart.button.back")}
          />
        </div>
      )}





      {step === 3 && (
        <div className="cart-content">
          <div className="cart-list">
            <table className="cart-table table">
              <thead>
                <tr>
                  <th colSpan={2}>{t("cart.table.product")}</th>
                  <th>{t("cart.table.price")}</th>
                  <th>{t("cart.table.qty")}</th>
                  <th>{t("cart.table.subtotal")}</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <th className="img">
                      <img src={item.images?.[0] || item.image} alt={item.name} />
                    </th>
                    <th className="title">
                      <span className="name">
                        {language === "zh-TW" ? item.nameZH : item.nameEN}
                      </span>
                    </th>
                    <td data-title={t("cart.table.price")}>
                      ${item.price}
                    </td>
                    <td data-title={t("cart.table.qty")}>
                      <span>{item.quantity || 1}</span>
                    </td>
                    <td data-title={t("cart.table.subtotal")}>
                      ${item.price * (item.quantity || 1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 顯示表單資料 */}
            <div className="order-info">
              <div className="label">{t("cart.paymentMethod")}</div>
              <div className="value">{t(`cart.payment.${formData.pay}`)}</div>

              <div className="label">{t("cart.form.name")}</div>
              <div className="value">{formData.name}</div>

              <div className="label">{t("cart.form.phone")}</div>
              <div className="value">{formData.phone}</div>

              <div className="label">{t("cart.form.email")}</div>
              <div className="value">{formData.email}</div>

              <div className="label">{t("cart.form.address")}</div>
              <div className="value">{formData.address}</div>

              <div className="label">{t("cart.section.invoice")}</div>
              <div className="value">
                {t(`cart.invoice.${formData.invoice}`)}
                {formData.invoice === "mobile" && `：${formData.carrier}`}
              </div>
            </div>

          </div>

          <CartSummary
            total={total}
            onNext={handleConfirm}
            onBack={() => setStep(2)}
            nextLabel={t("cart.button.confirm")}
            backLabel={t("cart.button.back")}
          />
        </div>
      )}


      {/* step 4: 完成畫面 */}
      {
        step === 4 && (
          <div className="order-complete">
            <img
              src={`${base}products/EndMonster.svg`}
              alt="EndMoster"
              className="endmoster-swing"
              style={{ width: 100, marginBottom: 20 }}
            />
            <div className="thankyou">
              <h2>{t("cart.done.title")}</h2>
              <p>{t("cart.done.subtitle")}</p>
            </div>
            <button className="keep" onClick={() => navigate(`${base}`)}>
              {t("cart.button.home")}
            </button>
          </div>
        )
      }

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ right: { xs: 90, sm: 90 } }}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{
            backgroundColor: "#a46230",
            color: "#fff",
            fontWeight: 600,
            fontSize: "15px",
            alignItems: "center",
          }}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}


export default CartPage;
