import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowtimes } from "./slice";
import Scrollbar from "react-scrollbars-custom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

// eslint-disable-next-line react/prop-types
export default function TimeList({ maHeThongRap, maCumRap }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showtimes = useSelector((state) => state.movieTheaterReducer.showtimes);
  const isLoggedIn = useSelector(
    (state) => state.authCustomerReducer.isLoggedIn
  );

  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pendingTicket, setPendingTicket] = useState(null);

  useEffect(() => {
    if (maHeThongRap) {
      setLoading(true);
      dispatch(fetchShowtimes(maHeThongRap)).finally(() => setLoading(false));
    }
  }, [maHeThongRap, dispatch]);

  useEffect(() => {
    if (!showtimes[maHeThongRap]) return;

    const data = showtimes[maHeThongRap] || [];
    const lstCumRap = data?.[0]?.lstCumRap || [];
    const selectedCinema = lstCumRap.find(
      (cumRap) => cumRap.maCumRap === maCumRap
    );

    if (selectedCinema) {
      const extractedShowtimes =
        selectedCinema.danhSachPhim?.map((phim) => ({
          tenCumRap: selectedCinema.tenCumRap,
          tenPhim: phim.tenPhim,
          maLichChieu:
            phim.lstLichChieuTheoPhim?.map((lich) => lich.maLichChieu) || [],
          hinhAnh: phim.hinhAnh,
          lichChieu:
            phim.lstLichChieuTheoPhim?.map((lich) =>
              new Date(lich.ngayChieuGioChieu).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            ) || [],
        })) || [];

      setFilteredShowtimes(extractedShowtimes);
    } else {
      setFilteredShowtimes([]);
    }
  }, [showtimes, maHeThongRap, maCumRap]);

  const handleBooking = (maLichChieu) => {
    if (isLoggedIn) {
      navigate(`/buy-tickets/${maLichChieu}`);
    } else {
      setPendingTicket(maLichChieu);
      setIsLoginModalOpen(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn && pendingTicket) {
      navigate(`/buy-tickets/${pendingTicket}`);
      setPendingTicket(null);
    }
  }, [isLoggedIn, pendingTicket, navigate]);

  const handleRegisterSuccess = () => {
    setIsRegisterModalOpen(false);
    setTimeout(() => {
      LoginModal(true);
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <motion.div
          className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <p className="ml-3 text-white font-semibold">Đang tải suất chiếu...</p>
      </div>
    );
  }

  if (!filteredShowtimes.length) {
    return <p className="text-white">Không có suất chiếu cho cụm rạp này.</p>;
  }

  return (
    <>
      <Scrollbar style={{ maxHeight: "670px" }}>
        <motion.div
          className="grid grid-cols-1 gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredShowtimes.map((showtime, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-xl shadow-lg flex items-center bg-white border border-gray-300 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img
                src={showtime.hinhAnh}
                alt={showtime.tenPhim}
                className="w-28 aspect-[3/4] object-cover rounded-lg mr-4 shadow-md border border-gray-200"
              />

              <div className="flex flex-col justify-between w-full">
                <p className="text-gray-800 font-bold text-lg">
                  {showtime.tenPhim || "Không có tên phim"}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {showtime.maLichChieu?.map((maLichChieuItem, idx) => (
                    <motion.span
                      onClick={() => handleBooking(maLichChieuItem)}
                      key={idx}
                      className="text-white font-semibold bg-[#5C469C] px-3 py-1 rounded-full shadow-md transition-all duration-300 transform hover:scale-110 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    >
                      {showtime.lichChieu?.[idx] || "N/A"}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Scrollbar>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
}
