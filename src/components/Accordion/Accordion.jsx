import { Swiper, SwiperSlide } from "swiper/react";
import AccordionIMG1 from "../../assets/accordionimg1.png"
import AccordionIMG2 from "../../assets/accordionimg2.png"

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import style from "./Accordion.module.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

const Accordion = () => {
  return (
    <div className={style.swiperWrapper}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className={style.mySwiper}
      >
        <SwiperSlide className={style.swiperSlide}>
            <img src={AccordionIMG1} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG2} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG1} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG2} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG1} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG2} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG1} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG2} alt="" />
        </SwiperSlide>
        <SwiperSlide className={style.swiperSlide}>]
             <img src={AccordionIMG1} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Accordion;
