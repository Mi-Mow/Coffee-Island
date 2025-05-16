import { useState, useRef, useEffect } from "react";
import "./Products.scss";
import { useNavigate } from "react-router-dom";

// 假資料區：使用 public 資料夾圖片路徑
const products = [
  {
    id: "1-1",
    name: "咖啡島-鶴嘴手沖壺",
    price: 1200,
    oldPrice: 1350,
    tag: "優選",
    isNew: false,
    category: "kettle",
    image: "/products/gooseneck1.jpg",
    hoverImage: "/products/gooseneck1Hover.jpg",
  },
  {
    id: "1-2",
    name: "304不鏽鋼掛耳咖啡細口手沖壺700ML",
    price: 650,
    oldPrice: 1350,
    tag: "優選",
    isNew: false,
    category: "kettle",
    image: "/products/gooseneck2.jpg",
    hoverImage: "/products/gooseneck2Hover.jpg",
  },
  {
    id: "1-3",
    name: "304不鏽鋼掛耳咖啡細口手沖壺700ML",
    price: 650,
    oldPrice: 1350,
    tag: "優選",
    isNew: false,
    category: "kettle",
    image: "/products/gooseneck3.jpg",
    hoverImage: "/products/gooseneck3Hover.jpg",
  },
  {
    id: "2-1",
    name: "日製濾網款式A",
    price: 420,
    oldPrice: 600,
    tag: "經典",
    isNew: false,
    category: "filter",
    image: "/products/coffeeFilter1.png",
    hoverImage: "/products/coffeeFilter1.jpg",
  },
  {
    id: "2-2",
    name: "日製濾網款式A",
    price: 420,
    oldPrice: 600,
    tag: "經典",
    isNew: false,
    category: "filter",
    image: "/products/coffeeFilter2.png",
    hoverImage: "/products/coffeeFilter2.jpg",
  },
  {
    id: "3-1",
    name: "古坑咖啡豆250g #台灣小農 #產地直銷",
    price: 550,
    oldPrice: 600,
    tag: "熱銷",
    isNew: true,
    category: "beans",
    image: "/products/coffeeBean1.jpg",
    hoverImage: "/products/coffeeBeanHover1.jpg",
  },
  {
    id: "3-2",
    name: " 關西咖啡豆250g #產地直銷 ",
    price: 600,
    oldPrice: 700,
    tag: "熱銷",
    isNew: false,
    category: "beans",
    image: "/products/coffeeBean2.jpg",
    hoverImage: "/products/coffeeBeanHover2.jpg",
  },
  {
    id: "3-3",
    name: " 阿里山咖啡豆250g #產地直銷 ",
    price: 600,
    oldPrice: 700,
    tag: "熱銷",
    isNew: false,
    category: "beans",
    image: "/products/coffeeBean3.jpg",
    hoverImage: "/products/coffeeBeanHover3.jpg",
  },
];

function ProductList() {
  const [activeCategory, setActiveCategory] = useState("kettle"); //預設分類設為kettle
  const [sortType, setSortType] = useState("熱門商品"); //預設分類設為熱門商品
  const [dropdownOpen, setDropdownOpen] = useState(false);  //預設下拉選單目前有沒有打開
  const dropdownRef = useRef(); // 用來指向下拉選單的區域，幫忙偵測是否點在外面，點選就關掉
  const navigate = useNavigate(); //用來導向productpage

  const [hoveredId, setHoveredId] = useState(null); // ⬅️ 新增：追蹤 hover 卡片

  //篩選下拉選單，第一步設定：如果點擊下拉選單以外的地方，就會為false
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //篩選下拉選單，第二步設定：
  const filteredProducts = products.filter(
    (item) => item.category === activeCategory //只留下「類別」跟你現在選的一樣的商品
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case "價錢高到低":
        return b.price - a.price;
      case "價錢低到高":
        return a.price - b.price;
      case "最新商品":
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  return (
    //顯示上方手沖壺、濾網、咖啡豆
    <div className="product-page">
      {/* 顯示分類選單（置中） */}
      <div className="top-bar">
        <div className="category-menu">
          {/* activeCategory 決定目前選的是哪個分類，被選的會加上 active 樣式 */}
          <div className={`tab ${activeCategory === "kettle" ? "active" : ""}`} onClick={() => setActiveCategory("kettle")}>手沖壺</div>
          <div className={`tab ${activeCategory === "filter" ? "active" : ""}`} onClick={() => setActiveCategory("filter")}>濾網</div>
          <div className={`tab ${activeCategory === "beans" ? "active" : ""}`} onClick={() => setActiveCategory("beans")}>咖啡豆</div>
        </div>
      </div>

      {/* 將篩選清單獨立出來，靠右對齊 */}
      <div className="sort-area">
        {/* 顯示篩選清單，ref={dropdownRef}偵測是否有點擊外面 */}
        <div className="sorting-wrapper" ref={dropdownRef}>
          <button
            className={`ranking-btn ${dropdownOpen ? "open" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {sortType} <span className="arrow">&#9662;</span>
          </button>

          {/* 顯示篩選清單內容 */}
          {dropdownOpen && (
            <ul className="sorting-options">
              {["熱門商品", "最新商品", "價錢高到低", "價錢低到高"].map((type) => (
                <li
                  key={type}
                  onClick={() => {
                    setSortType(type);
                    setDropdownOpen(false);
                  }}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => (
            <div
              className="product-card"
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              onMouseEnter={() => setHoveredId(item.id)} // ⬅️ 進入 hover
              onMouseLeave={() => setHoveredId(null)}     // ⬅️ 離開 hover
              style={{ cursor: "pointer" }}
            >
              {/* 卡片內要顯示的資料 */}
              <div className="tag">{item.tag}</div>
              <img
                src={hoveredId === item.id && item.hoverImage ? item.hoverImage : item.image}
                alt={item.name}
              />
              {item.isNew && <div className="new-tag">NEW</div>}
              <div className="info">
                <p className="name">{item.name}</p>
                <p className="price">
                  NT${item.price} <span className="old-price">NT${item.oldPrice}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">此分類目前沒有商品</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
