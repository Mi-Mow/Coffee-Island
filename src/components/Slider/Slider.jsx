import "./Slider.scss";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { gsap } from "gsap";
const base = import.meta.env.BASE_URL;

function Slider({ imageQ, district, id }) {
  const swiperWrapperRef = useRef(null);

  const adjustMargin = () => {
    const screenWidth = window.innerWidth;
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.marginLeft =
        screenWidth <= 600 ? "-100px" : screenWidth <= 900 ? "-200px" : "0";
    }
  };

  const images = [];
  for (let i = 1; i <= imageQ; i++) {
    images.push(`${district}_${id}_${i}.jpg`);
  }

  return (
    <div className="swiper-container">
      <div className="container">
        <Swiper
          modules={[Mousewheel, Pagination, Navigation]}
          grabCursor={true}
          initialSlide={1}
          centeredSlides={true}
          slidesPerView={2}
          speed={1000}
          loop={true}
          autoplay={{ delay: 1000 }}
          navigation={true}
          pagination={{ clickable: true }}
          mousewheel={{ thresholdDelta: 30 }}
          // coverflowEffect={{
          //   rotate: 0,
          //   stretch: 80,
          //   depth: 350,
          //   modifier: 1,
          //   slideShadows: true,
          // }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            1025: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
          }}
          // onSwiper={(swiper) => {
          //   swiperWrapperRef.current = swiper.wrapperEl;
          //   swiper.on("resize", adjustMargin);
          // }}
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
              <img src={`${base}cafe/${imagePath}`} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
