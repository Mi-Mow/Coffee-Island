import { Link } from 'react-router-dom'
import './News.scss'
import Article from './Article'
import story1 from '../../assets/news/story1.png'
import cafe1 from '../../assets/news/cafe1.jpg'

function News() {
  return (
    <>
      <div id='news'>
        <h1 className='title'>島嶼月報</h1>
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

          <div className='cover-story'>
            <img src={story1} alt="封面故事1" />
          </div>

          <br />

          <div className='section-row'>
            {/* 左欄 */}
            <section>
              <div className="feature1">
                <div className='feature'>
                  <h2>老臺北特輯</h2>
                  <a href="#">
                    <div>
                      <img src={story1} alt="老臺北特輯封面照片" />
                      <p>明星咖啡館與那個年代：台北文人的思想日常</p>
                    </div>
                  </a>


                </div>

                <h2>2025 最新文章</h2>
                <div className="newest">
                  <div>欄位 1</div>
                  <div>欄位 2</div>
                  <div>欄位 3</div>
                </div>
              </div>
            </section>

            {/* 右欄 */}
            <section>
              <div className="recommendation">
                <h2>人氣推薦</h2>
                <div>
                  列 1
                  <img src={cafe1} alt="人氣推薦咖啡廳照片" />
                </div>
                <div>列 2</div>
                <div>列 3</div>
              </div>
            </section>
          </div>



        </main>

      </div>

    </>
  )
}

export default News
