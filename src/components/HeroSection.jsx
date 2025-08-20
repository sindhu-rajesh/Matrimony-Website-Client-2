import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../assets/banner-1.jpg";
import banner2 from "../assets/banner-2.jpg";
import banner3 from "../assets/banner-3.jpg";
import { Link } from "react-router";

const slides = [
  {
    title: "Find Your Perfect Life Partner",
    subtitle: "Join thousands of happy couples who met through FindMyMate.",
    image: banner1,
  },
  {
    title: "Your Journey to Love Starts Here",
    subtitle: "Connect with people who share your values and vision.",
    image: banner2,
  },
  {
    title: "Safe, Trusted & Verified Profiles",
    subtitle: "We prioritize your privacy and matchmaking safety.",
    image: banner3,
  },
];

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        className="h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className=" bg-opacity-40 w-full h-full flex flex-col justify-center items-center px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white mb-6 max-w-2xl drop-shadow">
                  {slide.subtitle}
                </p>
                <Link
                  to="/Search"
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;


