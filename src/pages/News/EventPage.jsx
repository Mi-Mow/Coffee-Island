import { Link, useNavigate, useParams } from "react-router-dom";
import { events } from './Event'
const base = import.meta.env.BASE_URL;

function EventPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // -1 表示回到上一頁
    };

    const event = events[id];
    if (!event) return <div>找不到活動</div>;

    return (
        <div className="event-detail-page">
            <main className="event-detail-page">
                <nav>
                    <div className='nav-news'>
                        <ul>
                            <li>
                                <Link to={`${base}news/article`}>閱讀文章</Link>
                            </li>
                            <li>
                                <Link to={`${base}news/event`}>找活動</Link>
                            </li>
                        </ul>

                    </div>
                </nav>
            </main>


        </div>

    )
}
export default EventPage;