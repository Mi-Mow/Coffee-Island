import { Link, useNavigate } from 'react-router-dom'
import './News.scss'
const base = import.meta.env.BASE_URL;
// 活動資料
import { events } from './Event'
// 文章資料
import { articles } from './Article'
import { hotArticles } from './Article'
import EventCard from './components/EventCard'
import Coverstory from './components/Coverstory'
import NewsNav from './components/NewsNav';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';


function News() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  localStorage.setItem("currentPath", location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0); // 捲動到頁面頂部
  }, []);

  const navigate = useNavigate();

  function onClickArea(id) {
    navigate(`${base}news/event/${id}`);
  }

  return (
    <>
      <div id='news'>
        <h3 className='title'>{t("header.news")}</h3>
        <NewsNav/>

        <main>

          {/* 封面故事 */}
          <Coverstory />

          {/* 老臺北特輯 */}

          <div className='section-row'>
            {/* 左欄 */}
            <section>
              <div className="feature">
                <h2>{t("news.oldTaipei")}</h2>
                <div className='feature1'>
                  <Link to={`${base}news/article/${articles[0].id}`}>
                    <div>
                      <img src={articles[0].image} alt={articles[0].title} />
                      <h3>{ language === 'zh-TW' ? articles[0].title : articles[0].titleEN}</h3>
                    </div>
                  </Link>
                </div>

                <div className="newest">
                  <h2>2025 {t("news.latest")}</h2>
                  {/* new-cards */}
                  <div className="new-cards">
                    {articles.slice(1, 4).map((article) => (
                      <Link to={`${base}news/article/${article.id}`} key={article.id}>
                        <div>
                          <img src={article.image} alt={article.title} />
                          <p className="tagName">{ language === 'zh-TW' ? article.tag : article.tagEN}</p>
                          <h3>{ language === 'zh-TW' ? article.title : article.titleEN}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>

                </div >

              </div>
            </section>
            {/* 右欄 */}
            <section>
              <div className="recommendation">
                <h2>{t("news.popular")}</h2>
                <div className="reco-cards">
                  {/* reco-cards */}
                  {hotArticles.slice(0, 3).map((article) => (
                    <a key={article.id} href={`${base}news/article/${article.id}`} className="reco-card">
                      <div>
                        <img src={article.image} alt="人氣推薦咖啡廳照片" />
                      </div>
                      <div className="reco-card-text">
                        <p className="tagName">{t("news.special")}</p>
                        <h3>{ language === 'zh-TW' ? article.title : article.titleEN}</h3>
                      </div>
                    </a>
                  ))}
                </div>


                {/* btn */}

                <div className="reco-button">
                  <Link to={`${base}news/article`}>{t("news.viewMore")}</Link>
                </div>


              </div>
            </section>
          </div>

          {/* 活動 */}

          <div className="events">
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
              {events.map((event, index) => (
                <EventCard
                  className="event-card"
                  key={index}
                  onClick={() => onClickArea(event.id)}
                  imgSrc={event.imgSrc}
                  tags={ language === 'zh-TW' ? event.tags : event.tagsEN }
                  date={ language === 'zh-TW' ? event.date : event.dateEN }
                  title={ language === 'zh-TW' ? event.title : event.titleEN }
                  link={event.link}
                />
              ))}
            </div>

            {/* 按鈕 */}
            <div className="event-btn">
              <Link to={`${base}news/event`}>{t("news.viewMoreEvents")}</Link>

            </div>

          </div>



        </main >

      </div >

    </>
  )
}

export default News
