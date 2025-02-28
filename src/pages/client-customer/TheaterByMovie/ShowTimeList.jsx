import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

// eslint-disable-next-line react/prop-types
export default function ShowtimeList({ maPhim }) {
  const navigate = useNavigate();
  const { showtimesByMovie, selectedTheater, selectedBranch } = useSelector(
    (state) => state.theaterByMovieReducer
  );
  const isLoggedIn = useSelector(
    (state) => state.authCustomerReducer.isLoggedIn
  );

  const [selectedShowtime] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pendingTicket, setPendingTicket] = useState(null);

  const showtimes =
    showtimesByMovie[maPhim]?.heThongRapChieu
      .find((rap) => rap.maHeThongRap === selectedTheater)
      ?.cumRapChieu.find((cumRap) => cumRap.maCumRap === selectedBranch)
      ?.lichChieuPhim || [];

  if (showtimes.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500 text-sm">
        Không có suất chiếu.
      </div>
    );
  }

  const handleBooking = (maLichChieu) => {
    if (isLoggedIn) {
      navigate(`/buy-tickets/${maLichChieu}`);
    } else {
      setPendingTicket(maLichChieu);
      setIsLoginModalOpen(true);
    }
  };

  if (isLoggedIn && pendingTicket) {
    navigate(`/buy-tickets/${pendingTicket}`);
    setPendingTicket(null);
  }

  return (
    <>
      <div className="p-5 bg-white rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-3 justify-center">
          {showtimes.map((suatChieu) => {
            const time = new Date(
              suatChieu.ngayChieuGioChieu
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <span
                key={suatChieu.maLichChieu}
                className={`px-4 py-2 text-sm font-semibold rounded-full cursor-pointer transition-all
                  ${
                    selectedShowtime === suatChieu.maLichChieu
                      ? "bg-purple-700 text-white shadow-md scale-105"
                      : "bg-purple-500 text-white hover:bg-purple-600 hover:shadow-md hover:scale-105"
                  }`}
                onClick={() => handleBooking(suatChieu.maLichChieu)}
              >
                {time}
              </span>
            );
          })}
        </div>
      </div>

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
      />
    </>
  );
}
