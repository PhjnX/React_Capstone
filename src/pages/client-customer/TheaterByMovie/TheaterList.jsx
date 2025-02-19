import { useDispatch, useSelector } from "react-redux";
import { setSelectedTheater } from "./slice";
import { motion } from "framer-motion";

export default function TheaterList({ maPhim }) {
  const dispatch = useDispatch();
  const { showtimesByMovie, selectedTheater } = useSelector(
    (state) => state.theaterByMovieReducer
  );

  const theaters = showtimesByMovie[maPhim]?.heThongRapChieu || [];

  return (
    <motion.div
      className="space-y-4 overflow-y-auto flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {theaters.map((heThongRap, index) => {
        const isSelected = selectedTheater === heThongRap.maHeThongRap;

        return (
          <motion.div
            key={heThongRap.maHeThongRap}
            onClick={() =>
              dispatch(setSelectedTheater(heThongRap.maHeThongRap))
            }
            className={`cursor-pointer flex flex-col items-center p-2 rounded-full transition-all group shadow-md
              ${
                isSelected
                  ? "bg-white text-white shadow-lg scale-110"
                  : "hover:bg-gray-100 hover:text-white hover:shadow-lg"
              }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: isSelected ? 1.2 : 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={heThongRap.logo}
              alt={heThongRap.tenHeThongRap}
              className={`w-16 h-16 object-contain rounded-full border-2 transition-all
                ${
                  isSelected ? "border-white scale-125" : "border-transparent"
                }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: isSelected ? 1.2 : 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.2, borderColor: "white" }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
