import { Link } from 'react-router-dom'

function Article() {
    return (
        <>
            <div className="news-content">
                <h1 className='title'>閱讀文章</h1>

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

                </main>

            </div>
        </>

    )
}
export default Article