import { useParams, useNavigate, Link } from "react-router-dom"
// 文章資料
import { articles, hotArticles } from './Article'


function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const articleId = parseInt(id, 10);

    // 合併兩個資料來源，找到對應的文章
    const allArticles = [...articles, ...hotArticles];
    const article = allArticles.find(a => a.id === articleId);

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
    };

    // 處理段落與圖片對應
    const paragraphArray = Object.values(article.paragraphs);
    const imageArray = Array.isArray(article.smImg) ? article.smImg : [article.smImg];

    if (!article) return <div>找不到文章</div>;

    return (
        <div className="article-detail-page">
            <main className="article-detail-page">
                {/* <nav>
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
                </nav> */}

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
                    {/* 根據 hotArticles 的格式渲染段落與圖片 */}
                    {article.paragraphs && (
                        <div className="article-paragraphs">
                            {Object.values(article.paragraphs).map((p, idx) => {
                                const smImages = article.smImg || [];
                                const hasImage = smImages[idx];

                                return (
                                    <div className="paragraph-block" key={idx}>
                                        {hasImage && (
                                            <figure>
                                                <img src={smImages[idx]} alt={`段落圖片 ${idx + 1}`} />
                                            </figure>
                                        )}
                                        <p>{p}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
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