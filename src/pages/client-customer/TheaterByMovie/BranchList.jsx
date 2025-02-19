import { useDispatch, useSelector } from "react-redux";
import { setSelectedBranch } from "./slice";
import { motion } from "framer-motion";

export default function BranchList({ maPhim }) {
  const dispatch = useDispatch();
  const { showtimesByMovie, selectedTheater, selectedBranch } = useSelector(
    (state) => state.theaterByMovieReducer
  );

  const branches =
    showtimesByMovie[maPhim]?.heThongRapChieu.find(
      (rap) => rap.maHeThongRap === selectedTheater
    )?.cumRapChieu || [];

  return (
    <div className="space-y-4 p-4">
      {branches.map((cumRap, index) => {
        const isSelected = selectedBranch === cumRap.maCumRap;

        return (
          <motion.div
            key={cumRap.maCumRap}
            className={`p-4 rounded-xl shadow-lg cursor-pointer transition 
            duration-300 transform hover:scale-105 hover:shadow-xl 
            ${
              isSelected
                ? "bg-purple-400 text-white scale-110"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => dispatch(setSelectedBranch(cumRap.maCumRap))}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: isSelected ? 1.1 : 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 150,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-base font-bold">{cumRap.tenCumRap}</h3>
            <p className="text-sm opacity-80">{cumRap.diaChi}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
