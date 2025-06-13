import "./CartSummary.scss";
import { useTranslation } from "react-i18next";

function CartSummary({
    total,
    onNext,
    onBack,
    nextLabel,
    backLabel,
    showBack = true,
    disableNext = false,
    showShipping = true,
}) {
    const { t } = useTranslation();

    const shippingFee = total >= 1000 ? 0 : 80;

    return (
        <div className="cart-summary">
            <h3 className="summary-title">{t("cartSummary.title")}</h3>

            <div className="summary-line">
                <span>{t("cartSummary.subtotal")}</span>
                <span className="total-price">
                    NT${total.toLocaleString("zh-TW")}
                </span>
            </div>

            {showShipping && (
                <>
                    <div className="summary-line total-line">
                        <span>{t("cartSummary.shipping")}</span>
                        <span className="total-price red">
                            NT${shippingFee.toLocaleString("zh-TW")}
                        </span>
                    </div>
                    <div
                        className="free-shipping-tip"
                        style={{ color: "#fff", fontSize: "12px", marginBottom: "12px" }}
                    >
                        {t("cartSummary.freeTip")}
                    </div>
                    <div className="summary-line total-line grand-total">
                        <span>{t("cartSummary.total")}</span>
                        <span className="total-price">
                            NT${(total + shippingFee).toLocaleString("zh-TW")}
                        </span>
                    </div>
                </>
            )}

            <div className="button-group">
                <button className="next" onClick={onNext} disabled={disableNext}>
                    {nextLabel || t("cartSummary.next")}
                </button>
                {showBack && (
                    <button className="keep" onClick={onBack}>
                        {backLabel || t("cartSummary.back")}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CartSummary;
