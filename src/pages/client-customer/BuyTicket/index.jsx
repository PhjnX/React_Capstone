import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShowtimes,
  postTicketManagement,
  resetBuyTicket,
} from "../BuyTicket/slice";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BuyTicket.css";

export default function BuyTicket() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { showtimes, loading, error } = useSelector(
    (state) => state.buyTicketSlice
  );
  const [userBookTickets, setUserBookTickets] = useState([]);

  useEffect(() => {
    return () => dispatch(resetBuyTicket());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(fetchShowtimes(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (showtimes) {
      setUserBookTickets((prev) =>
        prev.filter((seat) =>
          showtimes.danhSachGhe.some((s) => s.maGhe === seat.maGhe && !s.daDat)
        )
      );
    }
  }, [showtimes]);

  const handleSeatSelection = useCallback((seat) => {
    if (seat.daDat) return;

    setUserBookTickets((prev) =>
      prev.some((s) => s.maGhe === seat.maGhe)
        ? prev.filter((s) => s.maGhe !== seat.maGhe)
        : [...prev, seat]
    );
  }, []);

  const handlePayment = useCallback(async () => {
    if (userBookTickets.length === 0) {
      toast.warn("Vui lòng chọn ghế trước khi thanh toán!", {
        autoClose: 2000,
      });
      return;
    }

    const ticketInfo = {
      maLichChieu: id,
      danhSachVe: userBookTickets.map(({ maGhe, giaVe }) => ({ maGhe, giaVe })),
    };

    try {
      await dispatch(postTicketManagement(ticketInfo)).unwrap();
      toast.success("Đặt vé thành công!", { autoClose: 2000 });
      setTimeout(() => dispatch(fetchShowtimes(id)), 500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Đặt vé thất bại!", {
        autoClose: 2000,
      });
    }
  }, [dispatch, id, userBookTickets]);

  const totalAmount = useMemo(
    () =>
      userBookTickets
        .reduce((total, seat) => total + seat.giaVe, 0)
        .toLocaleString(),
    [userBookTickets]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#ffcc00" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl text-red-500">Lỗi: {error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-12 gap-6">
        {/* Chọn ghế */}
        <div className="col-span-12 md:col-span-8">
          <div className="text-center mb-6">
            <div className="bg-gray-800 text-white text-xl font-semibold py-2 rounded-lg w-4/5 mx-auto">
              Màn hình
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2 justify-center mx-auto">
            {showtimes?.danhSachGhe.map((seat) => {
              const isSelected = userBookTickets.some(
                (s) => s.maGhe === seat.maGhe
              );
              return (
                <button
                  key={seat.maGhe}
                  className={`ghe ${seat.loaiGhe === "Vip" ? "gheVip" : ""} 
                    ${seat.daDat ? "gheDaDat" : ""} 
                    ${isSelected ? "gheDaDuocDat" : ""} 
                    transition-all duration-300 hover:scale-110`}
                  disabled={seat.daDat}
                  onClick={() => handleSeatSelection(seat)}
                >
                  {seat.stt}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center space-x-5 mt-6 text-sm">
            <LegendItem color="ghe" label="Thường" />
            <LegendItem color="gheVip" label="VIP" />
            <LegendItem color="gheDaDat" label="Đã đặt" symbol="X" />
            <LegendItem color="gheDaDuocDat" label="Đang chọn" symbol="✔" />
          </div>
        </div>

        {/* Thông tin vé */}
        <div className="col-span-12 md:col-span-4 bg-gray-900 p-5 rounded-lg text-white">
          <h3 className="text-2xl font-bold text-center mb-4">Thông tin vé</h3>
          <hr className="border-gray-600" />
          <div className="my-4">
            <p className="text-lg font-semibold">
              {showtimes?.thongTinPhim.tenPhim}
            </p>
            <p className="text-gray-400">{showtimes?.thongTinPhim.ngayChieu}</p>
            <p className="text-gray-400">
              {showtimes?.thongTinPhim.tenCumRap} -{" "}
              {showtimes?.thongTinPhim.tenRap}
            </p>
          </div>
          <hr className="border-gray-600" />
          <div className="my-4">
            <p className="font-semibold">Ghế đã chọn:</p>
            <div className="flex flex-wrap gap-2">
              {userBookTickets.map((seat) => (
                <span
                  key={seat.maGhe}
                  className="bg-yellow-500 px-3 py-1 rounded text-black font-semibold"
                >
                  {seat.stt}
                </span>
              ))}
            </div>
          </div>
          <hr className="border-gray-600" />
          <div className="my-4">
            <p className="font-semibold">Tổng tiền:</p>
            <p className="text-2xl font-bold text-yellow-400">
              {totalAmount} VNĐ
            </p>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const LegendItem = ({ color, label, symbol = "" }) => (
  <div className="flex items-center space-x-2">
    <div className={`ghe ${color}`}>{symbol}</div>
    <p>{label}</p>
  </div>
);
