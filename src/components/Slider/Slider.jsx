import "./Slider.scss";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { gsap } from "gsap";

function Slider({ imageQ, district, id }) {
  const swiperWrapperRef = useRef(null);

  const adjustMargin = () => {
    const screenWidth = window.innerWidth;
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.marginLeft =
        screenWidth <= 600 ? "-75px" : screenWidth <= 900 ? "-90px" : "-80px";
    }
  };

  const images = [];
  for (let i = 1; i <= imageQ; i++) {
    images.push(`${district}_${id}_${i}.jpg`);
  }

  return (
    <div className="swiper-container">
      <div className="container">
        {/* <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          //   slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {
            swiperWrapperRef.current = swiper.wrapperEl;
            swiper.on("resize", adjustMargin);
          }}
          onSlideChange={(swiper) => {
            const activeSlide = swiper.slides[swiper.activeIndex];
            gsap.fromTo(
              activeSlide,
              { scale: 0.5 },
              { scale: 1, duration: 0.5, ease: "back.inOut" }
            );
          }}
        >
          <SwiperSlide>
            <img src="/cafe/beitou_1_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/cafe/beitou_2_1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/cafe/beitou_1_2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/cafe/beitou_1_3.jpg" alt="" />
          </SwiperSlide>
        </Swiper> */}
        <Swiper
          modules={[Mousewheel, Pagination]}
          grabCursor={true}
          initialSlide={1}
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={10}
          speed={1000}
          //loop造成loading第一張會卡
          //   loop={true}
          autoplay={{ delay: 1000 }}
          pagination={{ clickable: true }}
          mousewheel={{ thresholdDelta: 30 }}
          coverflowEffect={{
            rotate: 0,
            stretch: 80,
            depth: 350,
            modifier: 1,
            slideShadows: true,
          }}
          onSwiper={(swiper) => {
            swiperWrapperRef.current = swiper.wrapperEl;
            swiper.on("resize", adjustMargin);
          }}
          onSlideChange={(swiper) => {
            const activeSlide = swiper.slides[swiper.activeIndex];
            gsap.fromTo(
              activeSlide,
              { scale: 0 },
              { scale: 1, duration: 0.5, ease: "back.inOut" }
            );
          }}
        >
          {images.map((imagePath, index) => (
            <SwiperSlide key={index}>
              <img src={`/cafe/${imagePath}`} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
