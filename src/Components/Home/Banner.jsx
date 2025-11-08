import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper';


import '../../../src/index.css';

// import required modules

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://media.assettype.com/deccanherald%2F2024-08-28%2Fq0qgu0ic%2FCity%20officials%2C%20public%20representatives%20and%20citizens%20themselves%20took%20up%20brooms%20and%20participated%20in%20cleaning%20the%20city%20roads.?w=undefined&auto=format%2Ccompress&fit=max" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.royalgreenwich.gov.uk/sites/default/files/styles/freestyle_lg/public/2024-11/Leafing%20image%206%20%282%29.jpg?itok=BfyLYWIN" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://gggi.org/wp-content/uploads/2021/06/WhatsApp-Image-2021-06-16-at-12.18.11-PM.jpeg" />
        </SwiperSlide>

      </Swiper>
    </>
  );
}
