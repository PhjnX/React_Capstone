import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimesByMovie } from "./slice";
import TheaterList from "./TheaterList";
import BranchList from "./BranchList";
import ShowtimeList from "./ShowtimeList";
import { motion } from "framer-motion";
import { Film, MapPin, Hourglass } from "lucide-react";

export default function TheaterByMovie({ maPhim }) {
  const dispatch = useDispatch();
  const { showtimesByMovie, loading, error } = useSelector(
    (state) => state.theaterByMovieReducer
  );

  useEffect(() => {
    if (maPhim) {
      dispatch(fetchShowtimesByMovie(maPhim));
    }
  }, [dispatch, maPhim]);

  const movieData = showtimesByMovie[maPhim]; // Lấy dữ liệu phim
  const movieTitle = movieData?.tenPhim || "Đang tải..."; // Lấy tên phim

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-60"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-3 text-lg font-medium text-gray-700">
          Đang tải lịch chiếu...
        </p>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-60 text-red-600"
      >
        <p className="text-lg font-medium">Lỗi: {error}</p>
      </motion.div>
    );

  if (!movieData?.heThongRapChieu)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-60"
      >
        <p className="text-gray-500 text-lg font-medium">
          Không có lịch chiếu.
        </p>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all"
    >
      {/* Hiển thị tên phim */}
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🎬 Lịch chiếu phim <span className="text-purple-500">{movieTitle}</span>
      </h1>

      {/* Tiêu đề danh sách */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ease: "easeInOut" }}
        className="grid grid-cols-[1fr_2fr_2fr] gap-6 mt-4 text-lg font-semibold text-gray-700 border-b pb-3 items-center"
      >
        <div className="flex justify-center">
          <p className="flex items-center gap-2">
            <Film className="w-5 h-5 text-indigo-500" /> Hệ thống rạp
          </p>
        </div>

        <div className="flex justify-center">
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" /> Cụm rạp
          </p>
        </div>

        <div className="flex justify-center">
          <p className="flex items-center gap-2">
            <Hourglass className="w-5 h-5 text-orange-500" /> Suất chiếu
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-[1fr_2fr_2fr] gap-6 mt-4"
      >
        <div className="p-4 border-r border-gray-200">
          <TheaterList maPhim={maPhim} />
        </div>
        <div className="p-4 border-r border-gray-200">
          <BranchList maPhim={maPhim} />
        </div>
        <div className="p-4">
          <ShowtimeList maPhim={maPhim} />
        </div>
      </motion.div>
    </motion.div>
  );
}
