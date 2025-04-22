import { Link } from 'react-router-dom'
import './News.scss'
import Article from './Article'
import story1 from '../../assets/news/story1.png'

function News() {
  return (
    <>
      <div id='news'>
        <h1>島嶼月報</h1>
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
          
          <br />

          <section id='coverstorys'>
            <img src={story1} alt="封面故事1" />
          </section>

          <br />

          <section className='section2'>
            <div className='feature'>
              <h2>老臺北特輯</h2>
              <img src={story1} alt="老臺北特輯1" />

            </div>
            <div className='recommendation'>
              <h2>人氣推薦</h2>

            </div>

          </section>



        </main>

      </div>

    </>
  )
}

export default News
