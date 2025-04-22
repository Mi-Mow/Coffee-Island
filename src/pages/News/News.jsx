import { Link } from 'react-router-dom'
import './News.scss'

function News() {
  return (
    <>
      <h1>島嶼月報</h1>
      <nav>
        <div className='nav-news'>
          <li>
            <Link to="/article">閱讀文章</Link>
          </li>
          <li>
            <Link to="/event">找活動</Link>
          </li>
        </div>
      </nav>
      <main>
        
      </main>
    </>
  )
}

export default News
