import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaSystems } from "./slice";
import { motion } from "framer-motion";

export default function CinemaSystem({ onSelect }) {
  const dispatch = useDispatch();
  const { cinemaSystems, loading, error } = useSelector(
    (state) => state.movieTheaterReducer
  );

  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    dispatch(fetchCinemaSystems());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <motion.div
          className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
        <p className="ml-3 text-white">Đang tải hệ thống rạp...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Lỗi tải hệ thống rạp!</div>;
  }

  const handleSelect = (maHeThongRap) => {
    setSelectedCinema(maHeThongRap);
    onSelect(maHeThongRap);
  };

  return (
    <motion.div
      className="flex flex-col gap-4 overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cinemaSystems.map((system, index) => (
        <motion.div
          key={system.maHeThongRap}
          onClick={() => handleSelect(system.maHeThongRap)}
          className={`text-black cursor-pointer flex flex-col items-center p-3 rounded-lg transition-all group 
    ${
      selectedCinema === system.maHeThongRap
        ? "bg-gray-700 text-white scale-105"
        : "hover:bg-gray-700 hover:text-white"
    }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={system.logo}
            alt={system.tenHeThongRap}
            className="w-14 h-14 object-contain"
          />
          <p className="text-sm font-semibold">{system.tenHeThongRap}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
