import { useParams, useNavigate } from "react-router-dom";
import article1 from '/news/article1.jpg';
import cafe1 from '/news/cafe1.jpg';

function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
    };
    const handleGoNews = () => {
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
            <h2>{article.title}</h2>
            <img src={article.image} alt={article.title} />
            <p>{article.content}</p>

            <button onClick={handleGoBack}>← 回上一頁</button>
            <button onClick={handleGoNews}>← 回到月報</button>
        </div>
    );

}
export default ArticlePage;