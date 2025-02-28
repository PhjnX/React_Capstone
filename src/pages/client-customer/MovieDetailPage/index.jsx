import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie, fetchShowtimes } from "./slice";
import ClipLoader from "react-spinners/ClipLoader";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import TheaterByMovie from "../TheaterByMovie";

export default function DetailMoviePage() {
  const { data, loading, error } = useSelector(
    (state) => state.detailMovieReducer
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailMovie(id));
      dispatch(fetchShowtimes(id));
    }
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#AC98E0" size={50} />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Lỗi tải dữ liệu: {error.message}
      </div>
    );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gray-900 text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center blur-lg opacity-50"
          style={{ backgroundImage: `url(${data?.hinhAnh})` }}
        ></div>

        <div className="relative container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 z-10">
          <div className="md:col-span-1 flex justify-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-80 h-auto rounded-lg shadow-lg"
              src={data?.hinhAnh}
              alt={data?.tenPhim}
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <h1 className="text-5xl font-bold mb-6">{data?.tenPhim}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {data?.moTa}
            </p>
            <p>
              <strong>Ngày khởi chiếu:</strong>{" "}
              {new Date(data?.ngayKhoiChieu).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <p className="text-yellow-400 text-2xl font-bold">
                ⭐ {data?.danhGia}/10
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-lg shadow-lg"
                onClick={() => setShowTrailer(true)}
              >
                <FaPlay /> Xem Trailer
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showTrailer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowTrailer(false)}
                className="absolute top-5 right-5 text-white text-3xl z-50"
              >
                ✖
              </motion.button>

              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-[80%] max-w-3xl"
              >
                <iframe
                  className="w-full h-[60vh] rounded-lg shadow-lg"
                  src={data?.trailer.replace("watch?v=", "embed/")}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="bg-white bg-opacity- container mx-auto px-6 py-12">
        <TheaterByMovie maPhim={id} />
      </div>
    </>
  );
}
