import { Link, useNavigate } from 'react-router-dom';
import EventCard from './components/EventCard';
import { useState } from 'react';
import event1 from '../../assets/news/activities/01.jpg';
import event2 from '../../assets/news/activities/02.jpg';
import event3 from '../../assets/news/activities/3.png';
import event4 from '../../assets/news/activities/4.jpg';
import event5 from '/cafe/neihu_16_1.jpg';
import event6 from '../../assets/news/activities/6.jpg';
import event7 from '../../assets/news/activities/7.jpg';

  // data陣列
  export const events = [
    {
      id: 1,
      imgSrc: event1,
      tags: ['外部活動', '咖啡展'],
      date: '2025/11/14~2025/11/17',
      startDate: new Date('2025-11-14'),
      endDate: new Date('2025-11-17'),
      title: '2025台灣國際咖啡展',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event2,
      tags: ['最新企劃', '復古咖啡廳'],
      date: '2025/04/30~2025/04/30',
      startDate: new Date('2025-06-30'),
      endDate: new Date('2025-06-30'),
      title: '徐明志｜品一杯草莓果醬味咖啡',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event3,
      tags: ['最新企劃', '復古咖啡廳'],
      date: '2025/05/30~2025/05/30',
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-05-30'),
      title: 'TYPICA WORLD CARAVAN 2025 - 台中場',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event4,
      tags: ['最新企劃', '復古咖啡廳'],
      date: '2025/05/30~2025/05/30',
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-05-30'),
      title: '徐明志｜品一杯草莓果醬味咖啡',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event5,
      tags: ['最新企劃', '復古咖啡廳'],
      date: '2025/05/30~2025/05/30',
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-05-30'),
      title: '徐明志｜品一杯草莓果醬味咖啡',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event6,
      tags: ['外部活動', '咖啡講座'],
      date: '2025/05/19~2025/05/19',
      startDate: new Date('2025-05-19'),
      endDate: new Date('2025-05-19'),
      title: 'Things about coffee《台灣埔里尋豆記》',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event7,
      tags: ['外部活動', '咖啡課程'],
      date: '2025/06/07~2025/06/28',
      startDate: new Date('2025-06-07'),
      endDate: new Date('2025-06-28'),
      title: '95究極烘豆班-單品豆烘焙(初階)',
      link: "/news/event/1" // 活動內容頁面
    },
    // 更多資料...
  ];

function Event() {

  const navigate = useNavigate();

    function onClickArea(id) {
        navigate(`/news/event/${id}`);
    }


  // setFilter
  const [filterTime, setFilterTime] = useState('全部');

  // filter
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const filterEventDates = events.filter(ev => {
    switch (filterTime) {
      case '今日':
        return isSameDay(ev.startDate, today);
      case '明日':
        return isSameDay(ev.startDate, tomorrow);
      case '當月展覽':
        return ev.startDate.getMonth() === today.getMonth();
      case '即將結束':
        const endSoon = (ev.endDate - today) / (1000 * 60 * 60 * 24);
        return endSoon <= 7 && endSoon >= 0; //定義7天內為即將結束
      default:
        return true;
    }
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
        <h1 className='title'>找活動</h1>
        <main>
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
              <p>時間</p>
              <div>
                {['今日', '明日', '當月展覽', '即將結束'].map((label, idx) => (
                  <div
                    key={idx}
                    // 點擊切換className名稱
                    className="time"
                    onClick={() => {
                      // console.log(`filterTime=${filterTime}, label=${label}`)
                      // 如果點到同一個就清除（回到「全部」），否則就設定新篩選
                      setFilterTime(filterTime === label ? '全部' : label);
                    }}
                    style={{ cursor: 'pointer',
                      fontWeight: filterTime === label ? 'bold' : 'normal',
                      backgroundColor: filterTime === label ? '#333' : '',
                    }}
                  >
                    <p>{label}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* 關鍵字搜尋 */}
            <div className="searchBar">
              <input type="text" placeholder="想找什麼活動嗎？例如：咖啡展" />
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
                  imgSrc={event.imgSrc}
                  tags={event.tags}
                  date={event.date}
                  title={event.title}
                  link={event.link}
                />
              ))}
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