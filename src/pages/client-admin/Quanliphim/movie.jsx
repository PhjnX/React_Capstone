import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai"; // icon tạo lịch chiếu
import { useDispatch } from "react-redux";
import { fetchDelete } from "./delete";
import { useNavigate } from "react-router-dom";

export default function Movie({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xoá phim
  const handleDelete = async (maPhim) => {
    if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
      await dispatch(fetchDelete(maPhim)); // Chờ xóa xong
      setTimeout(() => {
        window.location.reload(true); // Reload trang sau 500ms
      }, 500);
    }
  };


  // Chuyển hướng sang trang ShowTime kèm param maPhim
  const handleShowTime = (maPhim) => {
    navigate(`/admin/show-time/${maPhim}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="w-1/6 px-6 py-3">Mã phim</th>
            <th className="w-1/6 px-6 py-3">Hình ảnh</th>
            <th className="w-1/4 px-6 py-3">Tên phim</th>
            <th className="w-1/3 px-6 py-3">Mô tả</th>
            <th className="w-1/6 px-6 py-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
              {movie.maPhim}
            </td>
            <td className="px-6 py-4 flex justify-center">
              <div className="w-20 h-28 overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                />
              </div>
            </td>
            <td className="px-6 py-4">{movie.tenPhim}</td>
            <td className="px-6 py-4 text-left">
              <p className="line-clamp-2 text-gray-700 dark:text-white">
                {movie.moTa}
              </p>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-center w-full gap-3">
                <MdDelete
                  onClick={() => handleDelete(movie.maPhim)}
                  className="text-red-500 text-xl cursor-pointer"
                  title="Xoá phim"
                />
                <FaEdit
                  className="text-blue-500 text-xl cursor-pointer"
                  title="Chỉnh sửa phim"
                />
                {/* Icon Tạo lịch chiếu */}
                
                <AiOutlineFieldTime
                  onClick={() => handleShowTime(movie.maPhim)}
                  className="text-green-600 text-xl cursor-pointer"
                  title="Tạo lịch chiếu"
                />
                
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
