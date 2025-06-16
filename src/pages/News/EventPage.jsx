import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { events } from './Event'
import { useEffect, useRef } from "react";
const base = import.meta.env.BASE_URL;

function EventPage() {

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
                                <Link to={`${base}`}>首頁</Link>
                            </li>
                            <li>&gt;</li>
                            <li>
                                <Link to={`${base}news`}>島嶼月報</Link>
                            </li>
                            <li>&gt;</li>
                            <li>
                                <Link to={`${base}news/event`}>找活動</Link>
                            </li>
                            <li>&gt;</li>
                            <li aria-current="page">
                                {event.title} {/* 當前文章標題 */}
                            </li>
                        </ol>
                    </nav>
                    <section>
                        <div className="title-container">
                            <h1>{event.title}</h1>
                            <div>
                                <p>
                                    {event.tags[0]}
                                    {` `}
                                    {event.tags[1]}</p>
                            </div>
                        </div>
                        <div className="content-container">
                            <figure>
                                <img src={event.imgSrc} alt={event.title} />
                            </figure>
                            <p><strong>活動日期：</strong>{event.date}{event.time && `｜時間：${event.time}`}</p>
                            <p><strong>主辦單位：</strong>{event.organizer}</p>
                            <p><strong>活動內容：</strong></p>
                            {/* 文章段落 */}
                            <p style={{ margin: '20px 0' }}>{event.content}</p>

                        </div>
                        <p>
                            <strong>更多資訊：</strong>{event.p}
                            {event.link ? (
                                <a href={event.link} target="_blank" rel="noopener noreferrer"
                                    style={{ textDecoration: "underline" }}
                                >點此前往</a>
                            ) : (
                                <div className="book-button">
                                    <button onClick={() => alert('前往報名')}>點此預約</button>
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