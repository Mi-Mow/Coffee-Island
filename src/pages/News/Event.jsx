import { Link } from 'react-router-dom'
import event1 from '/news/event1.png'

function Event() {
  return (
    <>
      <div className="news-content">
        <h1 className='title'>找活動</h1>
        <main id='findEvent'>
          <nav>
            <div className='nav-news'>
              <ul
              ><li>
                  <Link to="/news/article">閱讀文章</Link>
                </li>
                <li>
                  <Link to="/news/event">找活動</Link>
                </li>
              </ul>

            </div>
          </nav>

          <section className='filterBar'>
            {/* 時間列 */}
            <div className="timeBar">
              時間
              <div>
                <div className="time">
                  <p>今日</p>
                </div>
                <div className="time">
                  <p>明日</p>
                </div>
                <div className="time">
                  <p>當月展覽</p>
                </div>
                <div className="time">
                  <p>即將結束</p>
                </div>
              </div>

            </div>

            {/* 關鍵字搜尋 */}
            <div className="searchBar">
              <button className='searchBtn'>請輸入關鍵字</button>

            </div>
          </section>

          <div className="findEvents">
            {/* 標題 */}
            <div className="event-title">
              <h2>Events</h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="321" height="3" viewBox="0 0 321 3" fill="none">
                <path d="M0.5 1.47754H320.5" stroke="#FFF1CB" strokeWidth="2" />
              </svg>
            </div>

            {/* 卡片區 */}
            {/* 一列3欄 */}
            <div className="event-cards">

              {/* 每張卡片 */}
              <a href="#" className="eventCard">
                <div className="event-card">
                  <img src={event1} alt="" />
                  <div className="event-tags">
                    <p className="tagName">最新企劃</p>
                    <p className="tagName">復古咖啡廳</p>
                  </div>
                  <p className="date">2025/04/05~2025/04/05</p>
                  <h2>徐明志｜品一杯草莓果醬味咖啡</h2>
                </div>

              </a>

              <a href="#" className="eventArea">
                <div className="event-card">
                  <img src={event1} alt="" />
                  <div className="event-tags">
                    <p className="tagName">最新企劃</p>
                    <p className="tagName">復古咖啡廳</p>
                  </div>
                  <p className="date">2025/04/05~2025/04/05</p>
                  <h2>徐明志｜品一杯草莓果醬味咖啡</h2>
                </div>
              </a>

              <a href="#" className="eventArea">
                <div className="event-card">
                  <img src={event1} alt="" />
                  <div className="event-tags">
                    <p className="tagName">最新企劃</p>
                    <p className="tagName">復古咖啡廳</p>
                  </div>
                  <p className="date">2025/04/05~2025/04/05</p>
                  <h2>徐明志｜品一杯草莓果醬味咖啡</h2>
                </div>
              </a>

            </div>

            {/* 一列3欄 */}
            <div className="event-cards">

              {/* 每張卡片 */}
              <a href="#" className="eventCard">
                <div className="event-card">
                  <img src={event1} alt="" />
                  <div className="event-tags">
                    <p className="tagName">最新企劃</p>
                    <p className="tagName">復古咖啡廳</p>
                  </div>
                  <p className="date">2025/04/05~2025/04/05</p>
                  <h2>徐明志｜品一杯草莓果醬味咖啡</h2>
                </div>

              </a>

              <a href="#" className="eventArea">
                <div className="event-card">
                  <img src={event1} alt="" />
                  <div className="event-tags">
                    <p className="tagName">最新企劃</p>
                    <p className="tagName">復古咖啡廳</p>
                  </div>
                  <p className="date">2025/04/05~2025/04/05</p>
                  <h2>徐明志｜品一杯草莓果醬味咖啡</h2>
                </div>
              </a>

              <a href="#" className="eventArea">
                <div className="event-card">
                  <img src={event1} alt="" />
                  <div className="event-tags">
                    <p className="tagName">最新企劃</p>
                    <p className="tagName">復古咖啡廳</p>
                  </div>
                  <p className="date">2025/04/05~2025/04/05</p>
                  <h2>徐明志｜品一杯草莓果醬味咖啡</h2>
                </div>
              </a>

            </div>

          </div>


          {/* 頁碼 */}
          <div className="pageNumberArea">
            <div>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
          </div>





        </main>

      </div>
    </>

  )
}
export default Event