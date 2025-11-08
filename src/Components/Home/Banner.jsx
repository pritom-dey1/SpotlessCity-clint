import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper";
import { Fade } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

export default function BannerSection() {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://media.assettype.com/deccanherald%2F2024-08-28%2Fq0qgu0ic%2FCity%20officials%2C%20public%20representatives%20and%20citizens%20themselves%20took%20up%20brooms%20and%20participated%20in%20cleaning%20the%20city%20roads.?w=undefined&auto=format%2Ccompress&fit=max"
              alt="Clean City Drive"
              className="w-full h-[600px] object-cover brightness-75"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40 px-4">
              <Fade direction="up" triggerOnce={false}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <Typewriter
                    words={["Join the Clean City Movement"]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                  />
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-6">
                  Together, we can build a greener, cleaner and brighter future for our community.
                </p>
                <button className="bg-[#18ae50] px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
                  Get Involved
                </button>
              </Fade>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://www.royalgreenwich.gov.uk/sites/default/files/styles/freestyle_lg/public/2024-11/Leafing%20image%206%20%282%29.jpg?itok=BfyLYWIN"
              alt="Clean Drive Volunteers"
              className="w-full h-[600px] object-cover brightness-75"
            />

hite bg-black/40 px-4">
              <Fade direction="up" triggerOnce={false}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <Typewriter
                    words={["Be a Community Hero"]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                  />
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-6">
                  Volunteer for our upcoming clean drive and make your area shine!
                </p>
                <button className="bg-[#18ae50] px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
                  Join Now
                </button>
              </Fade>
            </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src="https://gggi.org/wp-content/uploads/2021/06/WhatsApp-Image-2021-06-16-at-12.18.11-PM.jpeg"
              alt="Eco-friendly initiatives"
              className="w-full h-[600px] object-cover brightness-75"
            />

   
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
