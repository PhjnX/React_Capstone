import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMovie } from "./slice";
import { ClipLoader } from "react-spinners";
import { BsCameraReels } from "react-icons/bs";
import { motion } from "framer-motion";
import bg from "./../../../assets/images/bg.jpg";
import Movie from "./movie";
import { FlameIcon } from "lucide-react";

export default function ListMoviePage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const { data, loading, error, prevData } = useSelector(
    (state) => state.listMovieReducer
  );

  useEffect(() => {
    dispatch(fetchListMovie({ page, pageSize }));
  }, [dispatch, page]);

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 1;

  return (
    <div>
      <div className="w-50 h-20 bg-white"></div>
      <div
        className="relative bg-cover bg-center bg-no-repeat p-10 brightness-110 contrast-125 "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 b bg-opacity-0"></div>
        <div className="relative container mx-auto px-6 md:px-12 lg:px-24 ">
          <h1 className="text-4xl font-bold mb-10 text-center text-gray-300 flex justify-center items-center gap-3">
            <BsCameraReels className="text-purple-300 text-5xl animate-bounce" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text flex items-center gap-2 font-mono">
              HOT PHIM
              <FlameIcon
                className="w-8 h-8 text-orange-500"
                fill="currentColor"
                stroke="none"
              />
            </span>
          </h1>

          {error && (
            <div className="text-red-400 text-center my-4 text-lg font-semibold">
              Lỗi tải dữ liệu:{" "}
              {error.message || "Không thể tải danh sách phim."}
            </div>
          )}

          <div className="relative min-h-[300px]">
            {loading && (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
              >
                <ClipLoader color="#7C3AED" size={50} />
              </motion.div>
            )}

            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {(data?.items.length ? data.items : prevData)?.map(
                (movie, index) => (
                  <Movie key={movie.maPhim} movie={movie} index={index} />
                )
              )}
            </motion.div>
          </div>

          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                page === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-700"
              }`}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    page === pageNumber
                      ? "bg-purple-700 text-white border-2 border-purple-900"
                      : "bg-gray-700 text-white hover:bg-gray-500"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                page === totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-700"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
