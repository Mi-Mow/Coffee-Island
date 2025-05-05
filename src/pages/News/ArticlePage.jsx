import { useParams, useNavigate } from "react-router-dom";
import article1 from '/news/article1.jpg';

function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
      };
    const handleGoNews= ()=>{
        <Link to="/News"></Link>
    }

    const articles = {
        1: {
            title: '明星咖啡館與那個年代：台北文人的思想日常',
            content: '在1960年代末的台北街頭...',
            image: article1,
        },
        2: {
            title: '明星咖啡館與那個年代：台北文人的思想日常',
            content: '在1960年代末的台北街頭...',
            image: article1,
        },
        3: {
            title: '明星咖啡館與那個年代：台北文人的思想日常',
            content: '在1960年代末的台北街頭...',
            image: article1,
        }
        // 可以加入更多文章資料
    };
    const article = articles[id];

    if (!article) return <div>找不到文章</div>;

    return (
        <div className="article-detail-page">
            <h2>{article.title}</h2>
            <img src={article.image} alt={article.title} />
            <p>目前瀏覽的是第 {id} 篇文章。</p>
            <p>{article.content}</p>

            <button onClick={handleGoBack}>← 回上一頁</button>
            <button onClick={handleGoNews}>← 回到月報</button>
        </div>
    );

}
export default ArticlePage;