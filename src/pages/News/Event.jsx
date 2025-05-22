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
      tags: ['咖啡島企劃', '品豆體驗'],
      date: '2025/06/30~2025/06/30',
      startDate: new Date('2025-06-30'),
      endDate: new Date('2025-06-30'),
      title: '咖啡文化節｜品一杯草莓果醬味咖啡',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event3,
      tags: ['外部活動', '咖啡展'],
      date: '2025/05/30~2025/05/30',
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-05-30'),
      title: 'TYPICA WORLD CARAVAN 2025 - 台中場',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event4,
      tags: ['外部活動', '咖啡節'],
      date: '2025/05/30~2025/05/30',
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-05-30'),
      title: '啡你莫屬－關西鎮咖啡節',
      link: "/news/event/1" // 活動內容頁面
    },
    {
      imgSrc: event5,
      tags: ['外部活動', '復古咖啡廳'],
      date: '2025/05/30~2025/05/30',
      startDate: new Date('2025-05-30'),
      endDate: new Date('2025-05-30'),
      title: '咖啡文化講座',
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
                      backgroundColor: filterTime === label ? '#122f30' : '',
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

          {/* TOP按鈕 */}
            <div className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="62" viewBox="0 0 49 62" fill="none">
                    <path d="M48.479 5.23584C48.479 23.3317 48.479 41.4276 48.479 59.5234C48.1746 59.545 47.8811 59.5882 47.5767 59.5882C37.4332 59.6422 27.3006 59.7069 17.1571 59.7501C13.0258 59.7717 8.88364 59.7501 4.71971 59.7501C4.60012 59.2643 4.46967 58.854 4.39356 58.4329C3.26289 52.203 3.01282 45.9407 3.59991 39.6244C4.36094 31.3863 6.91583 23.8176 12.1126 17.2638C13.0041 16.1409 13.2433 15.0072 13.1672 13.582C13.0367 11.1958 13.1998 8.79886 13.2433 6.33714C14.8958 7.69756 16.233 8.89604 17.679 9.94335C18.6901 10.6884 19.8643 10.656 21.1254 10.4184C24.4957 9.7814 27.8877 9.0256 31.3015 8.89604C34.5413 8.77727 37.8137 9.39271 41.0644 9.72742C42.3364 9.85698 43.4671 9.97574 44.489 8.86365C45.7176 7.55721 47.1418 6.43431 48.479 5.23584ZM21.7994 22.1872C20.647 22.1332 19.4511 21.8957 18.6249 23.0402C17.4398 24.6813 17.9399 27.8665 19.6468 28.9246C21.332 29.9611 23.2128 30.0043 24.9523 29.1621C26.6157 28.3523 27.4202 26.8299 27.518 24.9944C27.605 23.4181 26.9636 22.6947 25.398 22.5003C24.2021 22.36 22.9953 22.2844 21.7994 22.1872ZM29.2575 38.5879C32.4104 38.5231 35.2588 37.7134 37.705 35.7375C38.1942 35.3488 38.6726 34.8521 38.9335 34.2907C39.314 33.4593 38.89 32.8007 38.0964 32.4012C37.1832 31.9369 37.194 32.7467 36.9005 33.2218C36.6396 33.6429 36.259 34.0748 35.8133 34.2799C34.5413 34.8737 33.2475 35.5 31.8885 35.8455C29.5946 36.4285 27.2789 36.1802 25.0066 35.4892C24.5935 35.3704 24.0825 35.5863 23.615 35.6511C23.7781 36.1802 23.8107 36.7956 24.126 37.1951C24.4087 37.5622 24.9849 37.7889 25.4741 37.8969C26.7244 38.1884 27.9964 38.372 29.2575 38.5879ZM38.6291 24.962C38.6182 23.2885 37.618 21.9605 36.3895 22.0037C35.2914 22.0468 34.4978 23.2345 34.5087 24.8109C34.5304 26.3549 35.4436 27.4886 36.6939 27.4994C37.9007 27.4994 38.6291 26.5384 38.6291 24.962Z" fill="#A46230" />
                    <path d="M48.4782 4.31049C47.141 5.51976 45.7168 6.64265 44.4992 7.95989C43.4772 9.07199 42.3465 8.95322 41.0745 8.82366C37.8238 8.48895 34.5514 7.87352 31.3116 7.99229C27.9087 8.11106 24.5058 8.87764 21.1355 9.51467C19.8635 9.7522 18.7002 9.7738 17.6891 9.0396C16.2431 7.98149 14.9059 6.78302 13.2534 5.43339C13.2099 7.89511 13.0468 10.2921 13.1773 12.6782C13.2534 14.1034 13.0142 15.2371 12.1227 16.36C6.91507 22.9138 4.37105 30.4717 3.61002 38.7207C3.02294 45.037 3.27298 51.2992 4.40366 57.5291C4.47976 57.9502 4.59936 58.3605 4.72982 58.8464C8.90462 58.8464 13.0359 58.8572 17.1673 58.8464C27.3107 58.8032 37.4433 58.7384 47.5868 58.6844C47.8912 58.6844 48.1847 58.6412 48.4891 58.6196C48.4891 59.559 48.4891 60.5091 48.4891 61.4485C36.6279 61.524 24.7667 61.5888 12.9163 61.6644C10.7637 61.6752 8.60021 61.6752 6.44758 61.7292C3.35997 61.8048 2.35975 61.1246 1.79442 58.1554C-0.129907 48.0385 -0.0320673 37.9757 2.92508 28.0532C4.28407 23.5076 6.50194 19.3508 9.40473 15.561C10.144 14.5893 10.3071 13.6068 10.3288 12.3759C10.3614 9.56866 10.7528 6.77222 11.0572 3.97579C11.1225 3.40354 11.4378 2.8421 11.7313 2.32384C12.4706 0.985007 13.7426 0.823049 14.808 1.92435C15.2538 2.38862 15.5799 2.95006 15.9822 3.45753C16.428 4.02977 16.8628 4.6236 17.3629 5.14186C18.6132 6.4591 19.9287 7.02055 21.9183 6.4699C28.1696 4.74238 34.5296 4.89354 40.8788 6.05962C41.716 6.21078 42.3248 6.1352 42.9771 5.50897C44.7818 3.79224 46.6518 2.15108 48.5 0.477539C48.4783 1.73 48.4782 3.01485 48.4782 4.31049Z" fill="white" />
                    <path d="M21.7976 21.2617C22.9935 21.3697 24.2003 21.4345 25.3962 21.5748C26.9618 21.7584 27.6032 22.4818 27.5162 24.0689C27.4184 25.8936 26.6138 27.4268 24.9505 28.2366C23.2001 29.0896 21.3301 29.0356 19.645 27.9991C17.9272 26.941 17.438 23.7558 18.623 22.1147C19.4384 20.9702 20.6343 21.1969 21.7976 21.2617Z" fill="white" />
                    <path d="M29.2558 37.6626C27.9947 37.4359 26.7226 37.2523 25.4724 36.9716C24.9831 36.8636 24.4178 36.6369 24.1243 36.2698C23.809 35.8703 23.7655 35.2441 23.6133 34.7258C24.0808 34.661 24.5917 34.4451 25.0049 34.5639C27.2771 35.2441 29.5819 35.5032 31.8868 34.9202C33.2458 34.5747 34.5395 33.9484 35.8115 33.3546C36.2464 33.1494 36.6378 32.7176 36.8987 32.2965C37.1923 31.8106 37.1814 31.0116 38.0946 31.4759C38.8883 31.8754 39.3123 32.5448 38.9318 33.3654C38.6817 33.916 38.1925 34.4127 37.7032 34.8122C35.2571 36.7881 32.4195 37.5978 29.2558 37.6626Z" fill="white" />
                    <path d="M38.6295 24.0366C38.6404 25.6129 37.9011 26.5739 36.7052 26.5739C35.4549 26.5631 34.5417 25.4402 34.52 23.8854C34.4982 22.3198 35.3027 21.1214 36.4008 21.0782C37.6076 21.035 38.6187 22.363 38.6295 24.0366Z" fill="white" />
                </svg>
            </div>





        </main>

      </div>
    </>

  )
}
export default Event