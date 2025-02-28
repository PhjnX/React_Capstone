  import PropTypes from "prop-types";
  import { Link } from "react-router-dom";
  import { motion } from "framer-motion";

  export default function Movie({ movie, index }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.08,
          rotate: 1.5,
          boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.2)",
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        className="relative rounded-xl overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-lg font-bold px-3 py-1 rounded-md z-10">
          {index + 1}
        </div>

        <motion.img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
          loading="lazy"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <Link
          to={`/detail/${movie.maPhim}`}
          className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/90 text-black w-16 h-16 rounded-full flex justify-center items-center text-3xl shadow-lg"
          >
            ▶
          </motion.div>
        </Link>

        <div className="text-white text-center p-3">
          <h3 className="text-lg font-semibold truncate">{movie.tenPhim}</h3>
          {movie.danhGia !== undefined && movie.danhGia !== null && (
            <p className="text-yellow-400 font-semibold text-sm mt-1 flex items-center justify-center gap-1">
              ⭐ {movie.danhGia.toFixed(1)}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  Movie.propTypes = {
    movie: PropTypes.shape({
      maPhim: PropTypes.number.isRequired,
      tenPhim: PropTypes.string.isRequired,
      hinhAnh: PropTypes.string.isRequired,
      danhGia: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
  };
