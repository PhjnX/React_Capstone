import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemasBySystem } from "./slice";
import Scrollbar from "react-scrollbars-custom";
import { motion } from "framer-motion";

export default function CinemaList({ maHeThongRap, onSelect }) {
  const dispatch = useDispatch();
  const { cinemas, cinemaSystems, loading } = useSelector(
    (state) => state.movieTheaterReducer
  );

  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    if (maHeThongRap) dispatch(fetchCinemasBySystem(maHeThongRap));
  }, [dispatch, maHeThongRap]);

  const cinemaList = cinemas[maHeThongRap] || [];

  // Tìm hệ thống rạp tương ứng để lấy logo
  const cinemaSystem = cinemaSystems.find(
    (system) => system.maHeThongRap === maHeThongRap
  );

  const handleSelect = (maCumRap) => {
    setSelectedCinema(maCumRap);
    onSelect(maCumRap);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <motion.div
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        ></motion.div>
        <p className="mt-3 text-white text-lg">Đang tải danh sách rạp...</p>
      </div>
    );
  }

  return (
    <Scrollbar style={{ maxHeight: "670px" }}>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cinemaList.map((cinema, index) => (
          <motion.div
            key={cinema.maCumRap}
            onClick={() => handleSelect(cinema.maCumRap)}
            className={` text-black p-4 rounded-xl shadow-md cursor-pointer flex items-center gap-3
                ${
                  selectedCinema === cinema.maCumRap
                    ? "bg-gray-700 scale-105 shadow-lg text-white"
                    : "hover:bg-gray-700 hover:text-white"
                }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={cinemaSystem?.logo || "/default-logo.png"}
              alt={cinema.tenCumRap}
              className="w-12 h-12 rounded-full object-cover bg-white p-1"
            />
            <h3 className="text-lg font-semibold">{cinema.tenCumRap}</h3>
          </motion.div>
        ))}
      </motion.div>
    </Scrollbar>
  );
}
