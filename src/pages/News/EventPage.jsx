import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { events } from './Event'
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
const base = import.meta.env.BASE_URL;

function EventPage() {
    const { t } = useTranslation();
    const { language } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0); // 捲動到頁面頂部
    }, []);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
    };

    const event = events.find(ev => ev.id === Number(id));
    if (!event) return <div>找不到活動</div>;

    const location = useLocation();
    const footerRef = useRef(null);

    useEffect(() => {
        // 從首頁進來（帶 query 參數 ?from=home）就滾到底部
        const fromHome = new URLSearchParams(location.search).get('from') === 'home';

        if (fromHome && footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    // 取得所有標籤
    const allTags = [...new Set(events.flatMap(ev => ev.tags))];

    return (

        <>
            <div>
                <main className="event-detail-page">
                    {/* 麵包屑區塊 */}
                    <nav className="breadcrumbs" aria-label="breadcrumb">
                        <ol style={{ listStyle: 'none', padding: 0, margin: '10px 0', display: 'flex', gap: '5px' }}>
                            <li>
                                <Link to={`${base}`}>{t("header.home")}</Link>
                            </li>
                            <li>&gt;</li>
                            <li>
                                <Link to={`${base}news`}>{t("header.news")}</Link>
                            </li>
                            <li>&gt;</li>
                            <li>
                                <Link to={`${base}news/event`}>{t("news.event")}</Link>
                            </li>
                            <li>&gt;</li>
                            <li aria-current="page">
                                { language === 'zh-TW' ? event.title : event.titleEN }{/* 當前文章標題 */}
                            </li>
                        </ol>
                    </nav>
                    <section>
                        <div className="title-container">
                            <h1>{ language === 'zh-TW' ? event.title : event.titleEN }</h1>
                            <div>
                                <p>
                                    { language === 'zh-TW' ? event.tags[0] : event.tagsEN[0] }
                                    {` `}
                                    { language === 'zh-TW' ? event.tags[1] : event.tagsEN[1] }</p>
                            </div>
                        </div>
                        <div className="content-container">
                            <figure>
                                <img src={event.imgSrc} alt={event.title} />
                            </figure>
                            <p><strong>{t("news.events.date")}</strong>{ language === 'zh-TW' ? event.date : event.dateEN }{event.time && `｜${ language === 'zh-TW' ? "時間" : "Event Time" }：${event.time}`}</p>
                            <p><strong>{t("news.events.organizer")}</strong>{ language === 'zh-TW' ? event.organizer : event.organizerEN }</p>
                            <p><strong>{t("news.events.details")}</strong></p>
                            {/* 文章段落 */}
                            <p style={{ margin: '20px 0' }}>{ language === 'zh-TW' ? event.content : event.contentEN}</p>

                        </div>
                        <p>
                            <strong>{t("news.events.moreInfo")}</strong>{ language === 'zh-TW' ? event.p : event.pEN }
                            {event.link ? (
                                <a href={event.link} target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: "underline" }}
                                >{t("news.events.go")}</a>
                            ) : (
                                <div className="book-button">
                                    <button onClick={() => alert('前往報名')}>{t("news.events.reservation")}</button>
                                </div>
                            )}

                        </p>


                        {/* 模擬底部區塊，讓首頁點擊時滾動至此 */}
                        {/* <div ref={footerRef} style={{ marginTop: '100px' }}>
                            <p>（底部區塊：報名、聯絡資訊等可放這）</p>
                        </div> */}


                    </section>



                </main>


            </div>
        </>


    )
}
export default EventPage;