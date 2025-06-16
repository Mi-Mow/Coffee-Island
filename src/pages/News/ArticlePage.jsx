import { useParams, useNavigate, Link } from "react-router-dom"
// 文章資料
import { articles, hotArticles } from './Article'
import { useEffect } from "react";
import shareIcon from "../../assets/news/icon-share.svg"
const base = import.meta.env.BASE_URL;


function ArticlePage() {

    useEffect(() => {
        window.scrollTo(0, 0); // 捲動到頁面頂部
    }, []);

    const { id } = useParams();
    const navigate = useNavigate();

    const articleId = parseInt(id, 10);

    // 合併兩個資料來源，找到對應的文章
    const allArticles = [...articles, ...hotArticles];
    const article = allArticles.find(a => a.id === articleId);

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
    };
    const handleGoArticle = () => {
        navigate(`${base}news/article`);
    };
    const handleGoNews = () => {
        navigate(`${base}news`);
    };


    // 處理段落與圖片對應
    const paragraphArray = Object.values(article.paragraphs);
    const imageArray = Array.isArray(article.smImg) ? article.smImg : [article.smImg];

    if (!article) return <div>找不到文章</div>;

    // share
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: '來看看這篇文章！',
                    url: window.location.href,
                });
            } catch (err) {
                console.error('分享失敗:', err);
            }
        } else {
            // 不支援 Web Share API，改用複製連結
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('已複製文章連結');
            } catch (err) {
                console.error('複製失敗:', err);
                alert('無法複製連結，請手動複製網址');
            }
        }
    };


    // 找到目前文章在 allArticles 的索引
    const currentIndex = allArticles.findIndex(a => a.id === articleId);

    // 取得下一篇文章（可選是否循環）
    const nextArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1
        ? allArticles[currentIndex + 1]
        : allArticles[0]; //循環回第一篇

    return (
        <div >
            <main className="article-detail-page" >

                {/* 麵包屑區塊 */}
                <nav className="breadcrumbs" aria-label="breadcrumb">
                    <ol style={{ listStyle: 'none', padding: 0, margin: '10px 0', display: 'flex', gap: '5px' }}>
                        {/* <li>
                            <Link to={`${base}`}>首頁</Link>
                        </li> */}
                        {/* <li>&gt;</li> */}
                        <li>
                            <Link to={`${base}news`}>島嶼月報</Link>
                        </li>
                        <li>&gt;</li>
                        <li>
                            <Link to={`${base}news/article`}>閱讀文章</Link>
                        </li>
                        <li>&gt;</li>
                        <li aria-current="page">
                            {article.title.length > 10 ? article.title.slice(0, 10) + '…' : article.title} {/* 當前文章標題 */}
                        </li>
                    </ol>
                </nav>

                <div className="article-share-container">
                    <button onClick={handleShare}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18.4434 18.7568H17.0352V19.9912H15.7852V21.457H5.78516V19.9912H4.55273V18.7402H5.80273V19.957H15.7852V18.7402H16.9434V13.8408H18.4434V18.7568ZM5.70312 8.66309V9.91309H4.55078V18.7568L3.05078 18.7559V9.89648H4.45312V8.66309H5.70312ZM14.127 3.79297H15.5898V5.04297H16.9258V6.29297H18.3086V7.54297H19.7422V8.41797H20.9492V9.66797H19.7422V10.543H18.3086V11.793H16.9258V13.043H15.5898V14.293H14.127V15.543H12.627V11.043H11.5352V12.0381H10.0703V13.0381H8.94531V14.2266H9.44531V15.4766H8.19531V14.293H7.44531V11.293H8.57031V10.0381H10.0352V8.03809H11.1309V7.04297H12.627V2.54297H14.127V3.79297ZM8.19531 8.6377H5.70312V7.1377H8.19531V8.6377Z" fill="#fff1cb" />
                        </svg>
                    </button>
                </div>

                <section>
                    {/* 標題區 */}
                    <div className="title-container">
                        <p>咖啡島 <span>{article.tag}</span></p>
                        {/* SEO h1 */}
                        <h1>{article.title}</h1>
                        <p>文 <span>{article.author}</span></p>
                    </div>
                    {/* 大圖 */}
                    <figure>
                        <img src={article.image} alt={article.title} />
                    </figure>
                    {/* 內文區 */}
                    <div className="content-container">

                        {/* 文章段落 */}
                        <p style={{ margin: '20px 0' }}>{article.content}</p>

                        {/* 根據 hotArticles 的格式渲染段落與圖片 */}
                        {article.paragraphs && (
                            <div className="article-paragraphs">
                                {Object.values(article.paragraphs).map((p, idx) => {

                                    const smImages = article.smImg || [];
                                    const hasImage = smImages[idx];

                                    return (
                                        <div className="paragraph-block" key={idx}>
                                            {hasImage && (

                                                <img className="smImg" src={smImages[idx]} alt={`段落圖片 ${idx + 1}`} />

                                            )}
                                            <div key={idx} style={{ margin: '20px 0' }}>
                                                {/* html <br> 換行 */}
                                                <p dangerouslySetInnerHTML={{ __html: p }} />
                                                {/* {renderParagraphWithLinks(p)} */}
                                            </div>
                                        </div>
                                    );
                                })}


                            </div>
                        )}
                    </div>


                    {/* 資訊區 */}
                    <div className="info-container">

                        <div className="info-text-container">
                            <p>店家資訊</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="315" height="2" viewBox="0 0 315 2" fill="none">
                                <path d="M0 1.47754H315" stroke="#FFF1CB" />
                            </svg>
                            {Array.isArray(article.info) && article.info.length > 0 ? (
                                article.info.map((line, idx) => (
                                    <p key={idx}>{line}</p>
                                ))
                            ) : (
                                <p className="note">很抱歉，暫無資料。</p>
                            )}

                        </div>
                    </div>
                </section>





                <br />

                {nextArticle && (
                    <div className="article-next">
                        <a onClick={() => {
                            navigate(`${base}news/article/${nextArticle.id}`);
                            window.scrollTo(0, 0);
                        }}>
                            下一篇：{nextArticle.title.length > 30 ? nextArticle.title.slice(0, 30) + '…' : nextArticle.title}
                            <img src={nextArticle.image} alt={nextArticle.title} />

                        </a>
                    </div>
                )}

                {/* 按鈕區 */}
                <div className="article-buttonGroup-container">
                    <div className="article-button-container">
                        <button onClick={handleGoBack}>上一頁</button>
                    </div>
                    {/* <div className="article-button-container">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>回到置頂</button>
                    </div> */}
                    <div className="article-button-container">
                        <button onClick={handleGoArticle}>回到列表</button>
                    </div>
                    <div className="article-button-container">
                        <button onClick={handleGoNews}>回到月報</button>
                    </div>
                </div>

            </main>

        </div>
    );

}
export default ArticlePage;