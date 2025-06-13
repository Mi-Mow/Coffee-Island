import { useState, useRef, useEffect } from "react";
import "./Products.scss";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
const base = import.meta.env.BASE_URL;

//商品頁區
export const products = [
  {
    id: "1-1",
    nameZH: "鶴嘴手沖壺",
    nameEN: "Gooseneck Kettle",
    price: 1200,
    oldPrice: 1350,
    tagZH: "優選",
    tagEN: "Best",
    isNew: false,
    category: "kettle",
    image: `${base}products/gooseneck1.jpg`,
    hoverImage: `${base}products/gooseneck1Hover.jpg`,
    images: [
      //`${base}products/gooseneck1.jpg`,
      `${base}products/gooseneck1Hover.jpg`,
      `${base}products/gooseneck1Des1.jpg`
    ],
    intro: "專業級鶴嘴壺嘴設計，細緻控水，手沖新手也能輕鬆掌握萃取節奏，打造精品級咖啡風味。",
    introEN: "Professional gooseneck spout design for precise water flow. Beginners can easily master extraction rhythm.",
    description: [
      "鶴嘴出水細長穩定，水流線精準適合各式手沖手法",
      "防滑舒適手把設計，長時間沖煮也不累手",
      "耐高溫霧面塗層，質感與實用兼具"
    ],
    descriptionEN: [
      "Slim and stable spout provides accurate flow control.",
      "Anti-slip ergonomic handle makes comfortable.",
      "High-temp resistant matte finish for both style."
    ],
    descImages: [
      `${base}products/gooseneck1Des3.jpg`,
      `${base}products/gooseneck1Des2.jpg`
    ],
    specs: {
      商品名稱: "鶴嘴手沖壺",
      品牌: "咖啡島 Coffee Island",
      型號: "Island Kettle 01",
      顏色: "霧黑",
      材質: "304不鏽鋼",
      容量: "300ml",
      重量: "550g",
      產地: "台灣設計，中國製造",
      適用熱源: "不適用於電磁爐／直火，建議注入熱水",
      表面處理: "耐高溫塗層，霧面防刮",
    },
    specsEN: {
      Name: "Coffee Island - Gooseneck Kettle",
      Brand: "Coffee Island",
      Model: "Island Kettle 01",
      Color: "Matte Black",
      Material: "304 Stainless Steel",
      Capacity: "300ml",
      Weight: "550g",
      Origin: "Designed in Taiwan, Made in China",
      Heating: "Not suitable for induction/direct heat. Pour hot water.",
      Finish: "High-temp resistant matte coating",
    }
  },
  {
    id: "1-2",
    nameZH: "魚嘴手沖壺300ml",
    nameEN: "Fish Spout Kettle 300ml",
    price: 1000,
    oldPrice: 1350,
    tagZH: "人氣",
    tagEN: "Popular",
    isNew: false,
    category: "kettle",
    image: `${base}products/gooseneck2.jpg`,
    hoverImage: `${base}products/gooseneck2Hover.jpg`,
    images: [
      `${base}products/gooseneck2.jpg`,
      `${base}products/gooseneck2Hover.jpg`,
      `${base}products/gooseneck2Des1.jpg`
    ],
    intro: "輕巧魚嘴設計，精準控水，適合少量沖煮。人體工學握感，手感絕佳，攜帶方便，是隨行手沖必備好物。",
    introEN: "Compact fish-spout design for precise pouring, perfect for small brews. Ergonomic grip with excellent handling makes it ideal for travel pour-over.",
    description: [
      "魚嘴壺嘴集中水流，提升手沖穩定性",
      "300ml小巧容量，適合一至兩杯沖煮",
      "人體工學設計手把，手感服貼防滑"
    ],
    descriptionEN: [
      "Fish concentrates water flow for improved control.",
      "300ml compact capacity ideal for 1-2 cups.",
      "Ergonomic anti-slip handle fits the hand perfectly."
    ],
    descImages: [
      `${base}products/gooseneck2Des1.jpg`,
      `${base}products/gooseneck2Des2.jpg`
    ],
    specs: {
      商品名稱: "魚嘴手沖壺300ml",
      品牌: "咖啡島 Coffee Island",
      型號: "Island Kettle 02",
      顏色: "霧黑",
      材質: "304不鏽鋼",
      容量: "300ml",
      重量: "320g",
      產地: "台灣設計，中國製造",
      適用熱源: "不適用於電磁爐／直火，建議注入熱水",
      表面處理: "耐高溫塗層，霧面防刮"
    },
    specsEN: {
      Name: "Coffee Island - Fish Spout Kettle 300ml",
      Brand: "Coffee Island",
      Model: "Island Kettle 02",
      Color: "Matte Black",
      Material: "304 Stainless Steel",
      Capacity: "300ml",
      Weight: "320g",
      Origin: "Designed in Taiwan, Made in China",
      Heating: "Not suitable for induction/direct heat. Pour hot water.",
      Finish: "High-temp resistant matte coating"
    }
  },
  {
    id: "1-3",
    nameZH: "掛耳細口手沖 300ml",
    nameEN: "Narrow-spout Kettle 300ml",
    price: 890,
    oldPrice: 1350,
    tagZH: "優選",
    tagEN: "Best",
    isNew: false,
    category: "kettle",
    image: `${base}products/gooseneck3.jpg`,
    hoverImage: `${base}products/gooseneck3Hover.jpg`,
    images: [
      `${base}products/gooseneck3Des2.jpg`,
      `${base}products/gooseneck3Des1.jpg`
    ],
    intro: "大容量設計，一次沖足全家或朋友聚會所需。精細壺嘴流線，適合細緻掌控各種注水方式。",
    introEN: "Large capacity design fulfills the needs of family or group gatherings. Slim spout ensures fine control for various pouring techniques.",
    description: [
      "700ml大容量，滿足多杯沖煮需求",
      "細口壺嘴易控水流，適合新手到老手",
      "堅固掛耳設計，攜帶更安全"
    ],
    descriptionEN: [
      "700ml large capacity satisfies multiple servings.",
      "Narrow spout provides easy control.",
      "Reinforced hanging handle for safer carry."
    ],
    descImages: [
      `${base}products/gooseneck3Des4.jpg`,
      `${base}products/gooseneck3Des3.jpg`
    ],
    specs: {
      商品名稱: "掛耳細口手沖壺700ml",
      品牌: "咖啡島 Coffee Island",
      型號: "Island Kettle 03",
      顏色: "霧黑",
      材質: "304不鏽鋼",
      容量: "700ml",
      重量: "600g",
      產地: "台灣設計，中國製造",
      適用熱源: "不適用於電磁爐／直火，建議注入熱水",
      表面處理: "耐高溫塗層，霧面防刮"
    },
    specsEN: {
      Name: "Coffee Island - Hanging Narrow-spout Kettle 700ml",
      Brand: "Coffee Island",
      Model: "Island Kettle 03",
      Color: "Matte Black",
      Material: "304 Stainless Steel",
      Capacity: "700ml",
      Weight: "600g",
      Origin: "Designed in Taiwan, Made in China",
      Heating: "Not suitable for induction/direct heat. Pour hot water.",
      Finish: "High-temp resistant matte coating"
    }
  },
  {
    id: "2-1",
    nameZH: "漏斗濾杯款式",
    nameEN: "Coffee Island-Filter A (Made in Japan)",
    price: 500,
    oldPrice: 600,
    tagZH: "經典",
    tagEN: "Classic",
    isNew: false,
    category: "filter",
    image: `${base}products/coffeeFilter1.jpg`,
    hoverImage: `${base}products/coffeeFilter1Hover.jpg`,
    images: [
      `${base}products/coffeeFilter1Hover.jpg`,
      `${base}products/coffeeFilter1Des1.jpg`
    ],
    intro: "日系工藝濾杯，V型設計萃取均勻，經典款式適合日常沖煮各式咖啡風味。",
    introEN: "Japanese craftsmanship filter with V-shaped design for even extraction. A classic choice for daily coffee brewing.",
    description: [
      "V型杯身設計，促進熱水均勻穿透咖啡粉",
      "高密度陶瓷材質，保溫效果佳",
      "杯底多孔，萃取順暢不卡粉"
    ],
    descriptionEN: [
      "V-shaped body promotes even water penetration.",
      "High-density ceramic for excellent heat retention.",
      "Multi-hole bottom ensures smooth extraction."
    ],
    descImages: [
      `${base}products/coffeeFilter1Des1.jpg`,
      `${base}products/coffeeFilter1Des2.jpg`
    ],
    specs: {
      商品名稱: "漏斗濾杯款式",
      品牌: "咖啡島 Coffee Island",
      型號: "Filter A",
      顏色: "象牙白",
      材質: "高密度陶瓷",
      容量: "1-2杯",
      重量: "250g",
      產地: "日本",
      適用熱源: "建議使用手沖熱水，不適直火",
      表面處理: "高溫釉燒處理"
    },
    specsEN: {
      Name: "Filter A (Made in Japan)",
      Brand: "Coffee Island",
      Model: "Filter A",
      Color: "Ivory White",
      Material: "High-density Ceramic",
      Capacity: "1-2 cups",
      Weight: "250g",
      Origin: "Japan",
      Heating: "Recommended for hand-pour hot water only. Not for direct heat.",
      Finish: "High-temperature glaze finish"
    }
  },
  {
    id: "2-2",
    nameZH: "日製濾杯款式",
    nameEN: "Coffee Island - Filter B (Made in Japan)",
    price: 420,
    oldPrice: 600,
    tagZH: "經典",
    tagEN: "Classic",
    isNew: false,
    category: "filter",
    image: `${base}products/coffeeFilter2.jpg`,
    hoverImage: `${base}products/coffeeFilter2Hover.jpg`,
    images: [
      `${base}products/coffeeFilter2.jpg`,
      `${base}products/coffeeFilter2Hover.jpg`,
      `${base}products/coffeeFilter2Des1.jpg`
    ],
    intro: "日本進口B款濾杯，特別的溝槽設計加強萃取效率，簡單易用，風味清新。",
    introEN: "Imported Filter B from Japan features spiral grooves for enhanced extraction. Easy to use with a refreshing flavor profile.",
    description: [
      "螺旋溝槽結構，提升萃取均勻性",
      "耐用陶瓷燒製，易於清洗",
      "底孔加大，防堵塞流速佳"
    ],
    descriptionEN: [
      "Spiral groove structure improves extraction.",
      "Durable ceramic build, easy to clean.",
      "Enlarged bottom hole prevents clogging."
    ],
    descImages: [
      `${base}products/coffeeFilter2Des1.jpg`,
      `${base}products/coffeeFilter2Des2.jpg`
    ],
    specs: {
      商品名稱: "日製濾杯款式",
      品牌: "咖啡島 Coffee Island",
      型號: "Filter B",
      顏色: "象牙白",
      材質: "高密度陶瓷",
      容量: "1-2杯",
      重量: "255g",
      產地: "日本",
      適用熱源: "建議使用手沖熱水，不適直火",
      表面處理: "高溫釉燒處理"
    },
    specsEN: {
      Name: "Filter (Made in Japan)",
      Brand: "Coffee Island",
      Model: "Filter B",
      Color: "Ivory White",
      Material: "High-density Ceramic",
      Capacity: "1-2 cups",
      Weight: "255g",
      Origin: "Japan",
      Heating: "Recommended for hand-pour hot water only. Not for direct heat.",
      Finish: "High-temperature glaze finish"
    }
  },

  {
    id: "3-1",
    nameZH: "古坑咖啡豆250g",
    nameEN: "Coffee Island - Gukeng Coffee Beans (250g)",
    price: 550,
    oldPrice: 600,
    tagZH: "熱銷",
    tagEN: "Popular",
    isNew: true,
    category: "beans",
    image: `${base}products/coffeeBean2.jpg`,
    hoverImage: `${base}products/coffeeBeanHover2.jpg`,
    images: [
      `${base}products/coffeeBean2.jpg`,
      `${base}products/coffeeBeanHover2.jpg`
    ],
    intro: "台灣古坑小農直送，新鮮烘焙、風味醇厚甘甜，適合手沖或義式濃縮。",
    introEN: "Freshly roasted Gukeng beans from local Taiwanese farmers. Rich, mellow sweetness—perfect for pour-over or espresso.",
    description: [
      "100%台灣古坑在地咖啡豆，新鮮直送",
      "中深焙，堅果香氣明顯，尾韻甘甜",
      "適合多種沖煮方式"
    ],
    descriptionEN: [
      "100% Gukeng-grown beans from Taiwan.",
      "Medium-dark roast with strong nutty aroma.",
      "Suitable for various brewing methods."
    ],
    descImages: [
      `${base}products/coffeeBean1Des1.jpg`,
      `${base}products/coffeeBean1Des2.jpg`
    ],
    specs: {
      商品名稱: "古坑咖啡豆250g",
      品牌: "咖啡島 Coffee Island",
      產地: "台灣 雲林古坑",
      重量: "250g",
      處理法: "水洗",
      烘焙度: "中深焙",
      保存期限: "半年",
      包裝: "單向透氣閥鋁箔袋"
    },
    specsEN: {
      Name: "Gukeng Coffee Beans (250g)",
      Brand: "Coffee Island",
      Origin: "Gukeng, Yunlin, Taiwan",
      Weight: "250g",
      Process: "Washed",
      Roast: "Medium-dark roast",
      ShelfLife: "6 months",
      Packaging: "Foil bag with one-way valve"
    }
  },
  {
    id: "3-2",
    nameZH: "關西咖啡豆250g",
    nameEN: "Guanxi Coffee Beans (250g)",
    price: 600,
    oldPrice: 700,
    tagZH: "熱銷",
    tagEN: "Popular",
    isNew: false,
    category: "beans",
    image: `${base}products/coffeeBean1.jpg`,
    hoverImage: `${base}products/coffeeBeanHover1.jpg`,
    images: [
      `${base}products/coffeeBean1.jpg`,
      `${base}products/coffeeBeanHover1.jpg`
    ],
    intro: "新竹關西在地嚴選豆，新鮮烘焙，帶有淡雅花香與明亮果酸，特色十足。",
    introEN: "Selected beans from Guanxi, Hsinchu. Freshly roasted with delicate floral aroma and bright acidity—a unique character.",
    description: [
      "新竹關西小農產地直送，品質新鮮有保證",
      "中淺焙，花果香明顯，口感層次豐富",
      "推薦搭配手沖，冰滴，法壓壺"
    ],
    descriptionEN: [
      "Farm-direct beans from Guanxi with freshness.",
      "Medium-light roast highlighting floral and fruity.",
      "Recommended for pour-over, cold brew, and French."
    ],
    descImages: [
      `${base}products/coffeeBean3Des1.jpg`,
      `${base}products/coffeeBean3Des2.jpg`
    ],
    specs: {
      商品名稱: "關西咖啡豆250g",
      品牌: "咖啡島 Coffee Island",
      產地: "台灣 新竹關西",
      重量: "250g",
      處理法: "日曬",
      烘焙度: "中淺焙",
      保存期限: "半年",
      包裝: "單向透氣閥鋁箔袋"
    },
    specsEN: {
      Name: "Guanxi Coffee Beans (250g)",
      Brand: "Coffee Island",
      Origin: "Guanxi, Hsinchu, Taiwan",
      Weight: "250g",
      Process: "Natural",
      Roast: "Medium-light roast",
      ShelfLife: "6 months",
      Packaging: "Foil bag with one-way valve"
    }
  },
  {
    id: "3-3",
    nameZH: "阿里山咖啡豆250g",
    nameEN: "Alishan Coffee Beans (250g)",
    price: 600,
    oldPrice: 700,
    tagZH: "熱銷",
    tagEN: "Popular",
    isNew: false,
    category: "beans",
    image: `${base}products/coffeeBean3.jpg`,
    hoverImage: `${base}products/coffeeBeanHover3.jpg`,
    images: [
      `${base}products/coffeeBean3.jpg`,
      `${base}products/coffeeBeanHover3.jpg`
    ],
    intro: "阿里山高山咖啡，獨特溫潤口感、果香奔放，帶有淡淡蜜糖韻味，限量推薦！",
    introEN: "Alishan high-mountain beans with smooth body, vibrant fruity flavor, and light honey notes. Limited edition favorite!",
    description: [
      "高山栽培，手摘精品，果香細緻奔放",
      "中焙處理，口感溫潤層次多變",
      "每批限量供應，珍貴首選"
    ],
    descriptionEN: [
      "Hand-picked high-altitude beans with delicate.",
      "Medium roast for a smooth, layered mouthfeel.",
      "Limited batches—premium choice for coffee lovers."
    ],
    descImages: [
      `${base}products/coffeeBean3Des1.jpg`,
      `${base}products/coffeeBean3Des2.jpg`
    ],
    specs: {
      商品名稱: "阿里山咖啡豆250g",
      品牌: "咖啡島 Coffee Island",
      產地: "台灣 嘉義阿里山",
      重量: "250g",
      處理法: "蜜處理",
      烘焙度: "中焙",
      保存期限: "半年",
      包裝: "單向透氣閥鋁箔袋"
    },
    specsEN: {
      Name: "Alishan Coffee Beans (250g)",
      Brand: "Coffee Island",
      Origin: "Alishan, Chiayi, Taiwan",
      Weight: "250g",
      Process: "Honey Processed",
      Roast: "Medium roast",
      ShelfLife: "6 months",
      Packaging: "Foil bag with one-way valve"
    }
  }];

  function ProductList() {
    const [activeCategory, setActiveCategory] = useState("kettle"); //預設分類設為kettle
    const [sortType, setSortType] = useState("popular"); //預設分類設為熱門商品
    const [dropdownOpen, setDropdownOpen] = useState(false);  //預設下拉選單目前有沒有打開
    const dropdownRef = useRef(); // 用來指向下拉選單的區域，幫忙偵測是否點在外面，點選就關掉
    const navigate = useNavigate(); //用來導向productpage
    const [hoveredId, setHoveredId] = useState(null);


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
        case "highToLow":
          return b.price - a.price;
        case "lowToHigh":
          return a.price - b.price;
        case "latest":
          return b.isNew - a.isNew;
        default:
          return 0;
      }
    });

    const { language } = useLanguage();
    const { t } = useTranslation();

    const dropdown = [
      {
        id: "popular",
        zh: "熱門商品",
        en: "Popular"
      },
      {
        id: "latest",
        zh: "最新商品",
        en: "Latest"
      },
      {
        id: "highToLow",
        zh: "價錢高到低",
        en: "In descending order of price"
      },
      {
        id: "lowToHigh",
        zh: "價錢低到高",
        en: "In ascending order of price"
      },
    ];

    const getTypeLabel = (typeId) => {
      const type = dropdown.find((type) => type.id === typeId);
      return type ? type[language === "zh-TW" ? "zh" : "en"] : typeId;
    };

    return (
      //顯示上方手沖壺、濾網、咖啡豆
      <div className="product-page">
        {/* 顯示分類選單（置中） */}
        <div className="top-bar">
          <div className="category-menu">
            {/* activeCategory 決定目前選的是哪個分類，被選的會加上 active 樣式 */}
            <div className={`tab ${activeCategory === "kettle" ? "active" : ""}`} onClick={() => setActiveCategory("kettle")}>{t("products.category.gooseneck")}</div>
            <div className={`tab ${activeCategory === "filter" ? "active" : ""}`} onClick={() => setActiveCategory("filter")}>{t("products.category.filter")}</div>
            <div className={`tab ${activeCategory === "beans" ? "active" : ""}`} onClick={() => setActiveCategory("beans")}>{t("products.category.beans")}</div>
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
              {getTypeLabel(sortType)} <span className="arrow">&#9662;</span>
            </button>

            {/* 顯示篩選清單內容 */}
            {dropdownOpen && (
              <ul className="sorting-options">
                {dropdown.map((type) => (
                  <li
                    key={type.id}
                    onClick={() => {
                      setSortType(type.id);
                      setDropdownOpen(false);
                    }}
                  >
                    {language === "zh-TW" ? type.zh : type.en}
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
                onClick={() => navigate(`${base}products/${item.id}`)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: "pointer" }}
              >
                {/* 卡片內要顯示的資料 */}
                <div className="tag">{language === 'zh-TW' ? item.tagZH : item.tagEN}</div>
                <img
                  src={hoveredId === item.id && item.hoverImage ? item.hoverImage : item.image}
                  alt={item.name}
                />
                {item.isNew && <div className="new-tag">NEW</div>}
                <div className="info">
                  <p className="name">{language === 'zh-TW' ? item.nameZH : item.nameEN}</p>
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
