import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBanner } from "./slice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import banner1 from "./../../../assets/images/banner1.jpg";
import banner2 from "./../../../assets/images/banner2.jpg";
import banner3 from "./../../../assets/images/banner3.jpg";
import banner4 from "./../../../assets/images/banner4.jpg";

export default function Carousel() {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector(
    (state) => state.bannerReducer
  );

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);


  if (loading)
    return (
      <div className="flex justify-center items-center h-[500px] ">
        <motion.div
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full "
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center">{error?.message || error}</div>
    );

  const extraBanners = [banner3, banner1, banner4, banner2].slice(
    0,
    Math.max(0, 4 - banners.length)
  );
  const displayBanners = [
    ...banners,
    ...extraBanners.map((hinhAnh) => ({ hinhAnh })),
  ];

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-white">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.7}
        centeredSlides
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {displayBanners.map(({ hinhAnh }, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <motion.img
              src={hinhAnh}
              alt={`Banner ${index + 1}`}
              className="w-[95%] h-full object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
