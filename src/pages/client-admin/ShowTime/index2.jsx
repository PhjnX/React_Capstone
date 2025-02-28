import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeThongRap, fetchCumRap, taoLichChieu } from "./slice2";

export default function ShowTime() {
  const dispatch = useDispatch();
  const { heThongRap, cumRap, loading, error } = useSelector((state) => state.cinemaReducer);

  const [selectedHeThongRap, setSelectedHeThongRap] = useState("");
  const [selectedCumRap, setSelectedCumRap] = useState("");
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("");
  const [giaVe, setGiaVe] = useState("");

  useEffect(() => {
    dispatch(fetchHeThongRap());
  }, [dispatch]);

  const handleSelectHeThongRap = (e) => {
    const maHeThongRap = e.target.value;
    setSelectedHeThongRap(maHeThongRap);
    dispatch(fetchCumRap(maHeThongRap));
  };

  const handleTaoLichChieu = async (e) => {
    e.preventDefault();
    const data = {
      maPhim: 0, // Giả sử mã phim là 123
      ngayChieuGioChieu:"string",
      maRap: 0,
      giaVe: 0,
    };

    console.log("Dữ liệu gửi đi:", data);
    
    try {
      const response = await dispatch(taoLichChieu(data)).unwrap();
      console.log("Phản hồi từ API:", response);
      alert("Tạo lịch chiếu thành công!");
    } catch (err) {
      console.error("Lỗi khi tạo lịch chiếu:", err);
      alert("Lỗi khi tạo lịch chiếu! Vui lòng thử lại.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 className="text-center text-black font-semibold">Tạo lịch chiếu - Avenger 123</h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

      <form onSubmit={handleTaoLichChieu} className="text-black" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Hệ thống rạp:</label>
        <select value={selectedHeThongRap} onChange={handleSelectHeThongRap} style={{ padding: "8px" }}>
          <option value="">Chọn hệ thống rạp</option>
          {heThongRap.map((rap) => (
            <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
              {rap.tenHeThongRap}
            </option>
          ))}
        </select>

        <label>Cụm rạp:</label>
        <select value={selectedCumRap} onChange={(e) => setSelectedCumRap(e.target.value)} style={{ padding: "8px" }}>
          <option value="">Chọn cụm rạp</option>
          {cumRap.map((cum) => (
            <option key={cum.maCumRap} value={cum.maCumRap}>
              {cum.tenCumRap}
            </option>
          ))}
        </select>

        <label>Ngày chiếu:</label>
        <input type="datetime-local" value={ngayChieuGioChieu} onChange={(e) => setNgayChieuGioChieu(e.target.value)} style={{ padding: "8px" }} />

        <label>Giá vé:</label>
        <input type="number" value={giaVe} placeholder="Nhập giá vé" onChange={(e) => setGiaVe(e.target.value)} style={{ padding: "8px" }} />

        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Tạo lịch chiếu
        </button>
      </form>
    </div>
  );
}
