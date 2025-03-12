import React from "react";
import avatarIImg from "../../assets/images/1.jpg"
import avatarIIImg from "../../assets/images/2.jpg";
import avatarIIIImg from "../../assets/images/3.jpg";
import avatarIVImg from "../../assets/images/4.jpg";
import avatarVImg from "../../assets/images/5.jpg";
import pinkBg from "../../assets/images/blue-bg.jpg"
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
      text: "Sentio has been incredibly helpful in my mental health journey. The personalized responses and empathetic support made me feel understood and heard.",
      author: "— Alexa Johnson",
    },
    {
      img: avatarIIImg,
      text: "I’ve never experienced anything like Sentio. It's emphatic ability made me feel like I was talking to a real counselor.",
      author: "— Sarah Williams",
    },
    {
      img: avatarIIIImg,
      text: "Sentio’s 24/7 availability and tailored advice have been a game-changer for me. Whether through speech or text, I always get the support I need.",
      author: "— Michaela Lee",
    },
    {
      img: avatarIVImg,
      text: "The virtual therapy sessions with Sentio were a great experience. I felt completely comfortable and received the guidance I needed, anytime, anywhere.",
      author: "— Emily Davis",
    },
    {
      img: avatarVImg,
      text: "Sentio is a life-saver! It combines advanced AI with genuine empathy, providing support that truly feels personalized and effective.",
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
