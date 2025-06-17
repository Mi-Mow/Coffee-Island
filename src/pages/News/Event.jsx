import { Link, useNavigate } from 'react-router-dom';
import EventCard from './components/EventCard';
import { useEffect, useState } from 'react';
import event1 from '../../assets/news/activities/01.jpg';
import event2 from '../../assets/news/activities/02.jpg';
import event3 from '../../assets/news/activities/3.png';
import event4 from '../../assets/news/activities/4.jpg';
import event5 from '../../assets/news/activities/event5.jpg';
import event6 from '../../assets/news/activities/6.jpg';
import event7 from '../../assets/news/activities/7.jpg';
import NewsNav from './components/NewsNav';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
const base = import.meta.env.BASE_URL;

// 防呆搜尋
function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 65248)
    )
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

// data陣列
export const events = [
  {
    id: 1,
    imgSrc: event1,
    tags: ['外部活動', '咖啡展'],
    tagsEN: ['External activities', 'Coffee Expo'],
    date: '2025/11/14~2025/11/17',
    dateEN: '2025/11/14~2025/11/17',
    startDate: new Date('2025-11-14'),
    endDate: new Date('2025-11-17'),
    time: '', // 無時間
    title: '2025台灣國際咖啡展',
    titleEN: '2025 Taiwan International Coffee Show',
    content: `台灣年度最盛大的咖啡產業盛事——「台灣國際咖啡展」，將於2025年11月14日至17日盛大舉辦！這場展覽不僅吸引全台咖啡品牌與國際精品咖啡廠商齊聚一堂，更是消費者與專業人士探索咖啡產業趨勢、創新技術與風味體驗的最佳平台。
活動涵蓋多元主題展區，包括精品咖啡、商用設備、烘焙器材、拉花工具、手沖配件與永續咖啡等。現場還將舉行「咖啡拉花比賽」、「感官杯測挑戰」、「咖啡師交流論壇」等專業競賽與講座活動，為參與者提供一站式的知識與技術提升機會。
不論您是咖啡愛好者、業界創業者，或是單純想探索香氣迷人的咖啡世界，都不容錯過這場豐富又具國際水準的咖啡盛典！`,
    contentEN: `Taiwan’s Largest Annual Coffee Industry Event — “2025 Taiwan International Coffee Show” — Will Take Place from November 14 to 17, 2025! This grand exhibition brings together Taiwan’s top coffee brands and renowned international specialty coffee companies, offering an exceptional platform for both consumers and industry professionals to explore market trends, innovative technologies, and immersive flavor experiences. The event features a wide range of thematic zones, including specialty coffee, commercial coffee equipment, roasting tools, latte art accessories, pour-over gear, and sustainable coffee solutions.
A variety of interactive programs will also take place onsite, such as the Latte Art Competition, Sensory Cupping Challenge, and the Barista Exchange Forum, providing attendees with a one-stop opportunity to enhance both knowledge and hands-on skills. Whether you're a coffee lover, an industry entrepreneur, or simply someone curious about the aromatic world of coffee, this international-standard event is not to be missed!`,
    organizer: "社團法人台灣咖啡協會、展昭國際企業股份有限公司",
    organizerEN: "Taiwan Coffee Association, Chan Chao International Co., Ltd.",
    link: "https://www.chanchao.com.tw/coffee/",
  },
  {
    id: 2,
    imgSrc: event2,
    tags: ['咖啡島企劃', '品豆體驗'],
    tagsEN: ['Coffee Island Project', 'Cupping Beans'],
    date: '2025/06/30~2025/06/30',
    dateEN: '2025/06/30~2025/06/30',
    startDate: new Date('2025-06-30'),
    endDate: new Date('2025-06-30'),
    time: '13:00~15:00',
    title: '台北咖啡探秘—城市中的豆香之旅',
    titleEN: 'Taipei Coffee Secrets — A Journey Through the Aromas of the City',
    content: `邀請你走進台北市區的隱藏咖啡園與烘焙坊，體驗都市中難得的咖啡小旅行。
專業咖啡農及烘焙師將分享咖啡品種、處理法及風味特色，讓你了解咖啡從產地到杯中的完整故事。
特別邀請來自台灣與義大利的咖啡師，現場示範多種沖煮技巧，並帶來獨家城市風味手沖咖啡。
這場融合國際文化與本地風情的咖啡體驗，將帶你探索台北獨有的咖啡魅力。`,
    content: `You’re invited to explore hidden coffee gardens and roasteries tucked away in the heart of Taipei — a rare and refreshing coffee journey within the city. Professional coffee farmers and roasters will share insights into coffee varietals, processing methods, and flavor profiles, guiding you through the complete story of coffee — from origin to cup. We’ve specially invited baristas from Taiwan and Italy to demonstrate a variety of brewing techniques on-site, featuring exclusive city-inspired pour-over coffee creations. This unique coffee experience — blending international expertise with local culture — will lead you into the rich and distinctive charm of Taipei’s coffee scene.`,
    p: '咖啡島限定，免費報名。',
    pEN: 'Coffee Island Limited. Free Admission',
    organizer: "咖啡島、伯朗咖啡",
    organizerEN: "Coffee Island, Mr. Brown Coffee",
    note: '假想文案，僅供網站設計練習使用',
    noteEN: 'Sample text for website design practice only.',
  },
  {
    id: 3,
    imgSrc: event3,
    tags: ['外部活動', '咖啡展'],
    tagsEN: ['External activities', 'Coffee Expo'],
    date: '2025/02/25~2025/02/25',
    dateEN: '2025/02/25~2025/02/25',
    startDate: new Date('2025-02-25'),
    endDate: new Date('2025-02-25'),
    time: '', // 無時間
    title: 'TYPICA WORLD CARAVAN 2025 - 台中場',
    titleEN: 'TYPICA WORLD CARAVAN 2025 – Taichung Edition',
    content: `來自日本的TYPICA，是連結世界咖啡生產者與烘豆師的全球平台，而他們的年度巡迴活動「TYPICA WORLD CARAVAN」在2025年首度來台舉辦。
此次台中場選擇了知名咖啡店 Coffee Stopover Black 作為舞台，邀請多位來自非洲與南美洲的咖啡生產者親自現身分享。
活動現場，參與者能親自品飲來自不同產區的限量咖啡豆，深入了解咖啡從農場到杯子的過程。
TYPICA 的理念是讓咖啡的價值被公平體現，這不僅是一場品飲活動，更是一場公平貿易、永續農業與人與人之間連結的美好體驗。`,
    contentEN: `TYPICA, a Japan-based global platform that connects coffee producers and roasters worldwide, is bringing its annual touring event — the TYPICA WORLD CARAVAN — to Taiwan for the very first time in 2025. For the Taichung stop, the event will take place at the renowned specialty café Coffee Stopover Black, featuring in-person appearances by coffee producers from Africa and South America, who will share their stories and insights directly with attendees. Guests will have the rare opportunity to taste limited-edition coffees from diverse origins and gain a deeper understanding of the journey from farm to cup. Driven by a mission to ensure that the value of coffee is fairly recognized, TYPICA goes beyond a simple tasting event — it offers a meaningful experience centered around fair trade, sustainable agriculture, and genuine human connection.`,
    organizer: "TYPICA",
    organizerEN: "TYPICA",
    link: "https://typica.jp/twc2025/tw/",
  },
  {
    id: 4,
    imgSrc: event4,
    tags: ['外部活動', '咖啡節'],
    tagsEN: ['External activities', 'Coffee Festival'],
    date: '2025/05/30~2025/05/30',
    dateEN: '2025/05/30~2025/05/30',
    startDate: new Date('2025-05-30'),
    endDate: new Date('2025-05-30'),
    time: '', // 無時間
    title: '啡你莫屬－關西鎮咖啡節',
    titleEN: 'Brewed for You – Guanxi Town Coffee Festival',
    content: `當春風吹起，新竹關西山林間飄來濃郁咖啡香。「2025關西咖啡節」以「啡你莫屬」為主題，邀請全台特色咖啡品牌聚集在馬武督的自然廣場，共同打造一場綠意與咖啡融合的戶外盛會。
活動亮點包括在地小農咖啡試飲、市集展售、露天音樂表演、咖啡拉花表演秀與DIY烘豆體驗，另有親子區、自然教育活動，適合全家參與。
這場咖啡節不只是品味，更是一場走入山林、享受片刻放鬆的週末旅行。`,
    contentEN: `As the spring breeze flows through the mountain forests of Guanxi, Hsinchu, the rich aroma of coffee fills the air. The 2025 Guanxi Coffee Festival, themed “Brewed for You”, brings together unique coffee brands from across Taiwan in the lush outdoor setting of Ma-Wu-Zu Forest Park, creating a vibrant celebration where greenery and coffee come together in harmony. Festival highlights include local smallholder coffee tastings, a marketplace with curated vendors, open-air music performances, latte art shows, and hands-on coffee roasting (DIY) workshops. A dedicated family area and nature education activities will also be available, making it a perfect event for visitors of all ages. More than just a tasting event, this coffee festival invites you to step into the forest and enjoy a refreshing weekend escape—where nature, coffee, and community converge.`,
    organizer: "關西鎮公所",
    organizerEN: "Guanxi Township Office ",
    link: "https://www.facebook.com/profile.php?id=61567286162150",
  },
  {
    id: 5,
    imgSrc: event5,
    tags: ['外部活動', '咖啡課程'],
    tagsEN: ['External activities', 'Coffee Course'],
    date: `2025/06/03 (進行中)`,
    dateEN: `2025/06/03 (Live Now)`,
    startDate: new Date('2025-06-03'),
    // endDate: new Date('2025-06-03'),
    time: '', // 無時間
    title: '臺灣客家茶文化館－DIY手沖咖啡',
    titleEN: 'Taiwan Hakka Tea Culture Center – DIY Pour-Over Coffee',
    content: `每天外帶咖啡，也想在家手沖出專於自己的大人味，體驗質感生活日常。

這是一堂手沖咖啡的入門體驗，帶您手把手帶您了解咖啡、磨豆的技巧、沖泡手法以及如何品嘗其中風味。

質感生活從此啟航，來一趟探索咖啡的深度旅行吧！`,
    contentEN: `For those who pick up a cup of coffee to-go every day, it’s time to brew your own bold flavor at home and savor a more intentional, quality lifestyle. This is an introductory pour-over coffee workshop, designed to guide you step by step through the essentials—understanding coffee, grinding techniques, brewing methods, and the art of tasting flavor notes. Begin your journey toward refined living. Let this be your first step into the rich and layered world of coffee.`,
    organizer: "臺灣客家茶文化館",
    organizerEN: "Taiwan Hakka Tea Culture Center",
    link: "https://www.hakkatea.tw/events/family/yearendspringprom5?event_category=family" // 活動內容頁面
  },
  {
    id: 6,
    imgSrc: event6,
    tags: ['外部活動', '咖啡講座'],
    tagsEN: ['External activities', 'Coffee Workshop'],
    date: '2025/05/19~2025/05/19',
    dateEN: '2025/05/19~2025/05/19',
    startDate: new Date('2025-05-19'),
    endDate: new Date('2025-05-19'),
    time: '', // 無時間
    title: 'Things about coffee《台灣埔里尋豆記》',
    titleEN: 'Things About Coffee: A Bean-Seeking Journey in Puli, Taiwan',
    content: `OOYA COFFEE《台灣埔里尋豆記》邀請你一同參與這趟尋豆旅程。
深入南投埔里咖啡園，與咖啡農對話，探索處理法、品種與風味。
由日本職人 Ooya 先生親自挑豆並烘焙，呈現深焙咖啡的經典香氣與餘韻。
這杯限定台灣豆，將是一趟台日合作的咖啡故事。`,
    contentEN: `OOYA COFFEE presents “A Bean-Seeking Journey in Puli, Taiwan”
We invite you to join us on this meaningful exploration into the heart of Taiwanese coffee. Venture into the lush coffee farms of Puli, Nantou, where you’ll engage in conversations with local farmers and uncover the intricate world of coffee varieties, processing methods, and flavor profiles. This exclusive coffee is carefully selected and deeply roasted by Mr. Ooya, a Japanese craftsman dedicated to the art of dark roast, bringing out a rich aroma and lingering finish in every cup. More than just a drink, this limited-edition Taiwanese coffee tells a story of collaboration between Taiwan and Japan — one of passion, craftsmanship, and shared appreciation for the bean.
`,
    organizer: "san galerie",
    organizerEN: "san galerie",
    link: "https://www.facebook.com/sangalerie/?locale=zh_TW",
  },
  {
    id: 7,
    imgSrc: event7,
    tags: ['外部活動', '咖啡課程'],
    tagsEN: ['External activities', 'Coffee Course'],
    date: '2025/06/07~2025/06/28',
    dateEN: '2025/06/07~2025/06/28',
    startDate: new Date('2025-06-07'),
    endDate: new Date('2025-06-28'),
    time: '', // 無時間
    title: '95究極烘豆班-單品豆烘焙(初階)',
    titleEN: '95 Ultimate Roasting Workshop – Single-Origin Coffee Roasting (Beginner Level)',
    content: `24小時課程，教授咖啡生豆品質鑑定與商用烘豆機操作。
適合初學者與對咖啡烘焙有興趣者，建立實作能力的基礎課程。`,
    contentEN: `This 24-hour course provides hands-on training in green coffee quality assessment and commercial roasting machine operation. Designed for beginners and coffee enthusiasts, the program builds a solid foundation in practical roasting skills and fundamental knowledge of coffee beans.`,
    organizer: "中國文化大學推廣教育部",
    organizerEN: "School of Continuing Education, Chinese Culture University",
    link: "https://www.sce.pccu.edu.tw/courses/XK14B4060",
  },
  {
    id: 8,
    imgSrc: `${base}news/event8.jpg`,
    tags: ['最新企劃', '復古咖啡廳'],
    tagsEN: ['Latest Project', 'Retro Cafés'],
    date: '2025/06/24~2025/06/24',
    dateEN: '2025/06/24~2025/06/24',
    startDate: new Date('2025-06-24'),
    endDate: new Date('2025-06-24'),
    time: '', // 無時間
    title: '品一杯草莓果醬味咖啡',
    titleEN: 'Savoring a Cup of Strawberry Jam–Flavored Coffee',
    content: `邀請你走進台北市區的隱藏咖啡園與烘焙坊，體驗都市中難得的咖啡小旅行。
專業咖啡農及烘焙師將分享咖啡品種、處理法及風味特色，讓你了解咖啡從產地到杯中的完整故事。
特別邀請來自台灣與義大利的咖啡師，現場示範多種沖煮技巧，並帶來獨家城市風味手沖咖啡。
這場融合國際文化與本地風情的咖啡體驗，將帶你探索台北獨有的咖啡魅力。`,
    contentEN: `You're invited to step into a hidden coffee garden and roastery in Taipei City, and experience a rare coffee mini-trip in the urban center. Professional coffee farmers and roasters will share insights into coffee varieties, processing methods, and flavor characteristics, allowing you to understand the complete story of coffee from farm to cup. We've specially invited baristas from Taiwan and Italy to demonstrate various brewing techniques on-site and present exclusive urban-flavored pour-over coffee. This coffee experience, blending international culture with local flair, will guide you in exploring Taipei's unique coffee charm.`,
    p: '咖啡島限定，免費報名。',
    pEN: 'Coffee Island Limited. Free Admission',
    organizer: "咖啡島",
    organizerEN: "Coffee Island",
    note: '假想文案，僅供網站設計練習使用',
    noteEN: 'Sample text for website design practice only.',
  },
];

function Event() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  localStorage.setItem("currentPath", location.pathname);
  
  useEffect(() => {
    window.scrollTo(0, 0); // 捲動到頁面頂部
  }, []);

  const navigate = useNavigate();

  function onClickArea(id) {
    navigate(`${base}news/event/${id}`);
  }


  const [searchKeyword, setSearchKeyword] = useState('');


  // setFilter
  const [filterTime, setFilterTime] = useState('全部');

  // filter
  
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const filterEventDates = events.filter(ev => {
    const matchTime = (() => {
      switch (filterTime) {
        case t('news.events.today'):
          return isSameDay(ev.startDate, today);
        case t('news.events.tomorrow'):
          return isSameDay(ev.startDate, tomorrow);
        case t('news.events.month'):
          return ev.startDate.getMonth() === today.getMonth();
        case t('news.events.end'):
          const endSoon = (ev.endDate - today) / (1000 * 60 * 60 * 24);
          return endSoon <= 7 && endSoon >= 0; //定義7天內為即將結束
        default:
          return true;
      }
    })();
    // 關鍵字搜尋
    // 防呆 + 雙語搜尋
    const normalizedKeyword = normalizeText(searchKeyword);
    const matchKeyword = !normalizedKeyword || [
      ev.title,
      ev.titleEN,
      ev.content,
      ev.contentEN,
      ...(ev.tags || []),
      ...(ev.tagsEN || [])
   ].some(field => field && normalizeText(field).includes(normalizedKeyword));

    return matchTime && matchKeyword;
  });

  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  return (
    <>
      <div id='findEvent'>
        <h1 className='title'>{t("news.events.all")}</h1>
        <NewsNav />
        <main>


          <section className='filterBar'>
            {/* 時間列 */}
            <div className="timeBar">
              {/* <p>時間</p> */}
              <div>
                {[t('news.events.today'), t('news.events.tomorrow'), t('news.events.month'), t('news.events.end')].map((label, idx) => (
                  <div
                    key={idx}
                    // 點擊切換className名稱
                    className="time"
                    onClick={() => {
                      // console.log(`filterTime=${filterTime}, label=${label}`)
                      // 如果點到同一個就清除（回到「全部」），否則就設定新篩選
                      setFilterTime(filterTime === label ? '全部' : label);
                    }}
                    style={{
                      cursor: 'pointer',
                      fontWeight: filterTime === label ? 'bold' : 'normal',
                      backgroundColor: filterTime === label ? '#904118' : '',
                    }}
                  >
                    <p>{label}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* 關鍵字搜尋 */}
            <div className="searchBar">
              <input type="text"
                placeholder={language === 'zh-TW' ? "想找什麼活動嗎？例如：咖啡展" : "Looking for an event? For example, a coffee exhibition?"}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </section>

          <div className="events">
            {/* 標題 */}
            {/* <div className="event-title">
              <h2>Events</h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="321" height="3" viewBox="0 0 321 3" fill="none">
                <path d="M0.5 1.47754H320.5" stroke="#FFF1CB" strokeWidth="2" />
              </svg>
            </div> */}

            {/* 卡片區 */}
            {/* 一列3欄 */}
            <div className="event-cards">
              {/* 每張卡片 */}
              {filterEventDates.map((event, index) => (
                <EventCard
                  key={index}
                  onClick={() => onClickArea(event.id)}
                  imgSrc={event.imgSrc}
                  tags={language === 'zh-TW' ? event.tags : event.tagsEN}
                  date={language === 'zh-TW' ? event.date : event.dateEN}
                  title={language === 'zh-TW' ? event.title : event.titleEN}
                  link={event.link}
                />
              ))}
            </div>
          </div>


          {/* 頁碼 */}
          {/* <div className="pageNumberArea">
            <div>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
          </div> */}


        </main>

      </div>
    </>

  )
}
export default Event