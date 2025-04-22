import { Link } from 'react-router-dom'
import './News.scss'
import Article from './Article'

function News() {
  return (
    <>
      <div id='news'>
        <h1>島嶼月報</h1>
        <main>
          <nav>
            <div className='nav-news'>
              <li>
                <Link to="/news/article">閱讀文章</Link>
              </li>
              <li>
                <Link to="/news/event">找活動</Link>
              </li>
            </div>
          </nav>
          <main>

          </main>

        </main>

      </div>

    </>
  )
}

export default News
