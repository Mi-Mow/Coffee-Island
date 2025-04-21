import './Products.scss'
import history2 from "../../assets/history2.png";

const products = [
  {
    id: 1,
    name: "304不鏽鋼掛耳咖啡細口手沖壺700ML",
    price: 650,
    oldPrice: 1350,
    tag: "優選",
    isNew: false,
    image: history2,
  },
  {
    id: 2,
    name: "不鏽鋼極細口咖啡手沖壺-700ml",
    price: 650,
    oldPrice: 1320,
    tag: "優選",
    isNew: true,
    image: history2,
  },
  {
    id: 3,
    name: "日製琺瑯細口手沖壺-500ml (IH爐可使用)",
    price: 650,
    oldPrice: 1320,
    tag: "優選",
    isNew: false,
    image: history2,
  },
];

function ProductList() {
  return (
    <div className="product-list">
      {products.map((item) => (
        <div className="product-card" key={item.id}>
          {/* 優選角標 */}
          <div className="tag">{item.tag}</div>

          {/* 商品圖片 */}
          <img src={item.image} alt={item.name} />

          {/* NEW 角標 */}
          {item.isNew && <div className="new-tag">NEW</div>}

          {/* 商品文字資訊 */}
          <div className="info">
            <p className="name">{item.name}</p>
            <p className="price">NT${item.price} <span className="old-price">NT${item.oldPrice}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
