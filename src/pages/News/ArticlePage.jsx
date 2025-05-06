import { useParams, useNavigate, Link } from "react-router-dom";
import article1 from '/news/article1.jpg';
import cafe1 from '/news/cafe1.jpg';

function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
    };

    const articles = {
        1: {
            title: '明星咖啡館與那個年代：台北文人的思想日常',
            content: '1980年代的臺北，正值經濟起飛，「臺灣錢淹腳目」的繁榮時期，都市文化也隨之蓬勃發展。​在這股浪潮中，咖啡廳逐漸成為市民休閒與文化交流的重要場所，承載著豐富的歷史與人文故事。',
            image: article1,
            info: '店家資訊店家資訊店家資訊店家資訊店家資訊'

        },
        2: {
            title: '明星咖啡館與那個年代：台北文人的思想日常',
            content: '1980年代的臺北，正值經濟起飛，「臺灣錢淹腳目」的繁榮時期，都市文化也隨之蓬勃發展。​在這股浪潮中，咖啡廳逐漸成為市民休閒與文化交流的重要場所，承載著豐富的歷史與人文故事。',
            image: article1,
            info: ''
        },
        3: {
            title: '明星咖啡館與那個年代：台北文人的思想日常',
            content: '1980年代的臺北，正值經濟起飛，「臺灣錢淹腳目」的繁榮時期，都市文化也隨之蓬勃發展。​在這股浪潮中，咖啡廳逐漸成為市民休閒與文化交流的重要場所，承載著豐富的歷史與人文故事。',
            image: article1,
        },
        // 人氣文章3篇
        101: {
            id: 101,
            title: '大稻埕最美秘境，預約制老宅咖啡館AKA café！',
            content: 'AKA café 藏身於大稻埕的百年老宅中，老屋紅磚與現代設計交織出懷舊又摩登的氛圍。推開木門，陽光灑落在磨石子地板上，老傢俱搭配極簡美學，彷彿時光暫停。這裡不只是喝咖啡的地方，更像一場舊時光與當代品味的對話。',
            image: cafe1
        },
        102: {
            id: 102,
            title: '隱藏在巷弄的復古咖啡館推薦',
            content: 'AKA café 藏身於大稻埕的百年老宅中，老屋紅磚與現代設計交織出懷舊又摩登的氛圍。推開木門，陽光灑落在磨石子地板上，老傢俱搭配極簡美學，彷彿時光暫停。這裡不只是喝咖啡的地方，更像一場舊時光與當代品味的對話。',
            image: cafe1
        },
        103: {
            id: 103,
            title: '台北10大人氣咖啡館TOP推薦',
            content: 'AKA café 藏身於大稻埕的百年老宅中，老屋紅磚與現代設計交織出懷舊又摩登的氛圍。推開木門，陽光灑落在磨石子地板上，老傢俱搭配極簡美學，彷彿時光暫停。這裡不只是喝咖啡的地方，更像一場舊時光與當代品味的對話。',
            image: cafe1
        }
        // 可以加入更多文章資料
    };
    const article = articles[id];

    if (!article) return <div>找不到文章</div>;

    return (
        <div className="article-detail-page">
            <main className="article-detail-page">
                <nav>
                    <div className='nav-news'>
                        <ul>
                            <li>
                                <Link to="/news/article">閱讀文章</Link>
                            </li>
                            <li>
                                <Link to="/news/event">找活動</Link>
                            </li>
                        </ul>

                    </div>
                </nav>

                {/* 標題區 */}
                <div className="title-container">
                    <p>咖啡島 老臺北特輯</p>
                    <h2>{article.title}</h2>
                    <p>文 陳誠成 攝 郭董郭</p>
                    <figure>
                        <img src={article.image} alt={article.title} />
                    </figure>
                </div>
                {/* 內文區 */}
                <div className="content-container">
                    <p>{article.content}</p>
                    <figure>
                        <img src={article.image} alt={article.title} />
                    </figure>
                    <p>1980年代的臺北，正值經濟起飛，「臺灣錢淹腳目」的繁榮時期，都市文化也隨之蓬勃發展。​在這股浪潮中，咖啡廳逐漸成為市民休閒與文化交流的重要場所，承載著豐富的歷史與人文故事。</p>
                    <figure>
                        <img src={article.image} alt={article.title} />
                    </figure>
                </div>
                {/* 資訊區 */}
                <div className="info-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="315" height="2" viewBox="0 0 315 2" fill="none">
                        <path d="M0 1.47754H315" stroke="#FFF1CB" />
                    </svg>
                    <div className="info-text-container">
                        <p>店家資訊</p>
                        <p>{article.info}</p>
                    </div>
                </div>

                <br />

                {/* 按鈕區 */}
                <div className="article-buttonGroup-container">
                    <div className="article-button-container">
                        <button onClick={handleGoBack}>上一頁</button>
                    </div>
                    <div className="article-button-container">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>回到置頂</button>
                    </div>
                    <div className="article-button-container">
                        <button onClick={() => <Link to="/news"></Link>}>回到月報</button>
                    </div>
                </div>

            </main>

        </div>
    );

}
export default ArticlePage;