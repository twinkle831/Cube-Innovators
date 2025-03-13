import React from "react";
import avatarIImg from "../../assets/images/1.jpg";
import avatarIIImg from "../../assets/images/2.jpg";
import avatarIIIImg from "../../assets/images/3.jpg";
import avatarIVImg from "../../assets/images/4.jpg";
import avatarVImg from "../../assets/images/5.jpg";
import pinkBg from "../../assets/images/blue-bg.jpeg"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Testimonials.css";
export default function Testimonials() {
  const testimonials = [
    {
      img: avatarIImg,
      text: "DreamPath has been a guiding light in my career journey. The AI-driven insights and personalized advice helped me gain clarity and confidence in my decisions.",
      author: "— Alexa Johnson",
    },
    {
      img: avatarIIImg,
      text: "I’ve never experienced anything like DreamPath. Its intuitive approach makes career counseling feel natural and deeply personalized, just like talking to a real mentor.",
      author: "— Sarah Williams",
    },
    {
      img: avatarIIIImg,
      text: "DreamPath’s 24/7 accessibility and expert-driven recommendations have been a game-changer. No matter the time, I always get the guidance I need.",
      author: "— Michaela Lee",
    },
    {
      img: avatarIVImg,
      text: "With DreamPath, I feel empowered in my career choices. Its AI-driven coaching gives me the confidence to take my next step with clarity and purpose.",
      author: "— Emily Davis",
    },
    {
      img: avatarVImg,
      text: "DreamPath is more than just a tool—it's a career partner. Its smart insights and tailored recommendations have truly transformed the way I plan my future.",
      author: "— David Smith",
    },
  ];
  

  return (
    <section>
      <div className="main">
      <div className="text-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold pt-6" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              <span className="text-[#f64a8a]">REAL STORIES,REAL </span> 
              <span className="text-[#64f7ff]">IMPACT </span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold pt-8 pb-12" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              <span className="text-[#64f7ff] mx-auto">TESTIMONIALS </span>
            </h1>
          </div>
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          navigation={true}
          modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 10,
            stretch: 50,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 150 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div style={{ paddingRight: 20, paddingLeft: 20, display: "flex", flexDirection: "column", height: "100%" }}>
  <div className="testimonials-profile-circle">
    <img src={testimonial.img} alt="testimonial-avatar" className="testimonial-avatar" />
  </div>
  <p style={{ flexGrow: 1 }}>{testimonial.text}</p>
  <h6 className="review-by" style={{ marginBottom: "8%", textAlign: "center" }}>{testimonial.author}</h6>
</div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
