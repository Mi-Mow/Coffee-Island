import { Link } from 'react-router-dom'
import './News.scss'
import Article from './Article'
import story1 from '/news/story1.png'
import cafe1 from '/news/cafe1.jpg'
import { useState } from 'react'

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
              <h2>老臺北特輯</h2>
              <div className="feature1">
                <div className='feature'>

                  <a href="#">
                    <div>
                      <img src={story1} alt="老臺北特輯封面照片" />
                      <p>明星咖啡館與那個年代：台北文人的思想日常</p>
                    </div>
                  </a>

                </div>

                <h2>2025 最新文章</h2>
                <div className="newest">
                  {/* 卡片區 */}
                  <a href="#">
                    <div>
                      <img src={story1} alt="" />
                      <h3>標籤</h3>
                      <p>欄1</p>
                    </div>
                  </a>
                  <a href="#">
                    <div>
                      <img src={story1} alt="" />
                      <h3>標籤</h3>
                      <p>欄2</p>
                    </div>
                  </a>
                  <a href="#">
                    <div>
                      <img src={story1} alt="" />
                      <h3>標籤</h3>
                      <p>欄3</p>
                    </div>
                  </a>


                </div >

              </div>
            </section>

            {/* 右欄 */}
            <section>
              <br />
              <div className="recommendation">
                <h2>人氣推薦</h2>
                {/* reco-cards */}
                <a href="#" className='reco-card'>
                  <div >
                    <img src={cafe1} alt="人氣推薦咖啡廳照片" />
                  </div>
                  <div className='reco-card-text'><p>標籤</p><h3>標題</h3></div>

                </a>
                <a href="#" className='reco-card'>
                  <div >
                    <img src={cafe1} alt="人氣推薦咖啡廳照片" />
                  </div>
                  <div className='reco-card-text'><p>標籤</p><h3>標題</h3></div>
                </a>
                <a href="#" className='reco-card'>
                  <div >
                    <img src={cafe1} alt="人氣推薦咖啡廳照片" />
                  </div>
                  <div className='reco-card-text'><p>標籤</p><h3>標題</h3></div>
                </a>
                {/* btn */}
                <a href={Article}>
                  <div className="reco-button">
                    <Link to="/news/article">看更多</Link>
                  </div>
                </a>


              </div>
            </section>
          </div>



        </main >

      </div >

    </>
  )
}

export default News
