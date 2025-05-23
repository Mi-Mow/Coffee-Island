import { useEffect, useRef, useState } from "react"
// import { HiChevronLeft } from "react-icons/hi";
// import { HiChevronRight } from "react-icons/hi";
import { articles } from "../Article"
import { Link } from 'react-router-dom'
const base = import.meta.env.BASE_URL;

export default function App() {
    // 自訂變數
    const [currentIndex, setCurrentIndex] = useState(0);
    // 把 setInterval 存進一個 ref
    const intervalRef = useRef(null);
    const isHovered = useRef(false);

    // 陣列存放資料
    const slides = [
        { url: `${base}news/story1.png` },
        { url: `${base}news/story2.jpg` },
        { url: `${base}news/story3.jpg` },
        { url: `${base}news/story4.jpg` },
    ]

    // 啟動自動輪播
    const startAutoplay = () => {
        stopAutoplay(); // 清除舊的 interval
        intervalRef.current = setInterval(() => {
            if (!isHovered.current) {
                nextSlide();
            }
        }, 3000);
    };

    // 停止自動輪播
    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleMouseEnter = () => {
        isHovered.current = true;
    };

    const handleMouseLeave = () => {
        isHovered.current = false;
    };

    // 當currentIndex改變時，會再觸發一次
    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, []);

    // 建立自訂函式
    // 往後一張
    const nextSlide = () => {
        // 判斷是否在最後一張(總長度(4)-1，索引編號0,1,2,3)，成立=>回第一張(0)，不成立=>往後下一張(+1)
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
    }
    // 往前一張
    const prevSlide = () => {
        // 判斷是否第一張，成立=>回最後一張(3)，不成立=>往前一張(-1)
        setCurrentIndex((nextIndex) => (nextIndex === 0 ? slides.length - 1 : nextIndex - 1))
    }

    // 按鈕控制
    // 自訂變數存放兩個參數，direction放置左右icon，onClick存放左右事件
    // const Arrow = ({ direction, onClick }) => {
    // return (
    // 擺放icon的區域
    // <div style={{
    //     position: "absolute",
    //     top: "50%",
    //     cursor: "pointer",
    //     color: "white",
    //     [direction]: "20px", // 將icon拆開，並調整左右留白間距，[]區隔變數
    // }}>
    {/* 判斷direction是否等於left，成立>>左icon */ }
    {/* {
                    direction === "left"
                        ? (<HiChevronLeft onClick={onClick} size={50} />)
                        : (<HiChevronRight onClick={onClick} size={50} />)
                } */}

    // </div>
    // )
    // }


    return (
        <>
            {/* 滿版最外層 */}
            <div className="cover-story"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* 滿版背景輪播圖 */}
                <Link to={`${base}news/article/${articles[currentIndex].id}`}>
                    <div className="cover-img"
                        style={{
                            backgroundImage: `url(${slides[currentIndex].url})`,
                            backgroundSize: "cover",
                            transition: "transform 0.8s ease-in-out",
                        }}
                    >
                    </div>
                </Link>

                {/* icon 上一張 */}
                {/* <Arrow direction="left" onClick={prevSlide} />
                {/* icon 下一張 */}
                {/* <Arrow direction="right" onClick={nextSlide} /> */}

            </div>
        </>
    )
}