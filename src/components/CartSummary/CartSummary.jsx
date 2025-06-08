import "./CartSummary.scss";

function CartSummary({
    total,
    onNext,
    onBack,
    nextLabel = "下一步",
    backLabel = "返回上一步",
    showBack = true,
    disableNext = false,
    showShipping = true,
}) {
    // 運費判斷
    const shippingFee = total >= 1000 ? 0 : 80;

    return (
        <div className="cart-summary">
            <h3 className="summary-title">預訂摘要</h3>
            <div className="summary-line">
                <span>金額小計</span>
                <span className="total-price">NT${total}</span>
            </div>
            {showShipping && (
                <>
                    <div className="summary-line total-line">
                        <span>運費</span>
                        <span className="total-price red">
                            NT${shippingFee}
                        </span>
                    </div>
                    <div className="free-shipping-tip" style={{ color: "#fff", fontSize: "12px", marginBottom: "12px" }}>
                        滿1000元，全館免運
                    </div>
                    <div className="summary-line total-line grand-total">
                        <span>總計金額</span>
                        <span className="total-price">NT${total + shippingFee}</span>
                    </div>
                </>
            )}
            <div className="button-group">
                <button className="next" onClick={onNext} disabled={disableNext}>
                    {nextLabel}
                </button>
                {showBack && (
                    <button className="keep" onClick={onBack}>
                        {backLabel}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CartSummary;
