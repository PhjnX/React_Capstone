import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import thunk
import { fetchHeThongRap, fetchCumRap, createShowTime } from "./slice";

// Import api nếu bạn cần fetch detail phim:
import api from "../../services/api";

export default function ShowTime() {
  const { idFilm } = useParams(); // Lấy param :idFilm
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const { loading, error, heThongRapList, cumRapList, createResult } =
    useSelector((state) => state.showTimeReducer);

  // State lưu thông tin phim (để hiển thị tên phim, hình ảnh,...)
  const [movieDetail, setMovieDetail] = useState(null);

  // State form, gắn maPhim = idFilm
  const [formData, setFormData] = useState({
    maPhim: idFilm, // hoặc Number(idFilm)
    maHeThongRap: "",
    maRap: "",
    ngayChieuGioChieu: "",
    giaVe: 0,
  });

  // 1) Khi load component -> gọi fetchHeThongRap() để có danh sách Hệ thống rạp
  useEffect(() => {
    dispatch(fetchHeThongRap());
  }, [dispatch]);

  // 2) Khi có idFilm -> gọi API lấy detail phim để hiển thị tên + hình ảnh
  useEffect(() => {
    if (!idFilm) return;
    (async () => {
      try {
        const res = await api.get(
          `QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`
        );
        setMovieDetail(res.data.content);
      } catch (error) {
        console.log("Lỗi lấy thông tin phim:", error);
      }
    })();
  }, [idFilm]);

  // 3) Khi user chọn 1 hệ thống rạp -> gọi fetchCumRap(maHeThongRap)
  const handleChangeHeThongRap = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      maHeThongRap: value,
      maRap: "", // reset cumRap
    });
    if (value) {
      dispatch(fetchCumRap(value));
    }
  };

  // 4) Xử lý thay đổi các input còn lại
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 5) Submit form => createShowTime
  const handleSubmit = (e) => {
    e.preventDefault();

    const rawDateTime = formData.ngayChieuGioChieu;
    const dateObj = new Date(rawDateTime);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = "00";

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    dispatch(
      createShowTime({
        ...formData,
        ngayChieuGioChieu: formattedDateTime,
      })
    );
  };

  // 6) Nếu tạo lịch chiếu thành công -> Thông báo
  useEffect(() => {
    if (createResult) {
      alert("Tạo lịch chiếu thành công!");
      // hoặc bạn có thể redirect, hoặc clear form...
    }
  }, [createResult]);

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Phần hiển thị tên phim & hình ảnh */}
        <div className="flex flex-col text-black items-center mb-4">
          {movieDetail ? (
            <>
              <img
                src={movieDetail.hinhAnh}
                alt={movieDetail.tenPhim}
                className="w-40 h-60 object-cover rounded-lg shadow-md mb-2"
              />
              <h2 className="text-xl text-black font-semibold text-center">
                Tạo lịch chiếu cho phim: {movieDetail.tenPhim}
              </h2>
            </>
          ) : (
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Movie Poster"
                className="w-40 h-60 object-cover rounded-lg shadow-md mb-2"
              />
              <p>Đang tải thông tin phim...</p>
            </div>
          )}
        </div>

        {/* Form tạo lịch chiếu */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Chọn hệ thống rạp */}
          <div className="text-black">
            <label className="block text-gray-700 font-medium">
              Hệ thống rạp
            </label>
            <select
              name="maHeThongRap"
              value={formData.maHeThongRap}
              onChange={handleChangeHeThongRap}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Chọn hệ thống rạp</option>
              {heThongRapList?.map((item) => (
                <option key={item.maHeThongRap} value={item.maHeThongRap}>
                  {item.tenHeThongRap}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn cụm rạp */}
          <div className="text-black">
            <label className="block text-gray-700 font-medium">Cụm rạp</label>
            <select
              name="maRap"
              value={formData.maRap}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Chọn cụm rạp</option>
              {cumRapList?.map((cum) => (
                // tuỳ backend: có thể là cum.maCumRap, cum.tenCumRap
                <option key={cum.maCumRap} value={cum.maCumRap}>
                  {cum.tenCumRap}
                </option>
              ))}
            </select>
          </div>

          {/* Ngày chiếu giờ chiếu */}
          <div className="text-black">
            <label className="block text-gray-700 font-medium">
              Ngày chiếu giờ chiếu (yyyy-MM-ddThh:mm)
            </label>
            <input
              type="datetime-local"
              name="ngayChieuGioChieu"
              value={formData.ngayChieuGioChieu}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Giá vé */}
          <div className="text-black">
            <label className="block text-gray-700 font-medium">Giá vé</label>
            <input
              type="number"
              name="giaVe"
              value={formData.giaVe}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md"
              placeholder="Ví dụ: 75000"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
          >
            {loading ? "Đang xử lý..." : "Tạo lịch chiếu"}
          </button>
        </form>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
