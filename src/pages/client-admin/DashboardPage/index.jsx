import React from "react";
import { FaFilm, FaUsers, FaStar } from "react-icons/fa";

export default function Dashboard() {
  // Dữ liệu thống kê (có thể thay bằng API)
  const stats = {
    totalMovies: 120,
    totalUsers: 3500,
    averageRating: 4.5,
  };

  return (
    <div className="container mx-auto">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-center h-24 bg-red-500 text-white rounded-lg shadow-md">
            <FaFilm size={40} />
            <div className="ml-4">
              <p className="text-lg">Tổng số phim</p>
              <p className="text-2xl font-bold">{stats.totalMovies}</p>
            </div>
          </div>

          <div className="flex items-center justify-center h-24 bg-blue-500 text-white rounded-lg shadow-md">
            <FaUsers size={40} />
            <div className="ml-4">
              <p className="text-lg">Tổng số người dùng</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="flex items-center justify-center h-24 bg-green-500 text-white rounded-lg shadow-md">
            <FaStar size={40} />
            <div className="ml-4">
              <p className="text-lg">Đánh giá trung bình</p>
              <p className="text-2xl font-bold">{stats.averageRating} ⭐</p>
            </div>
          </div>
        </div>

        {/* Khu vực khác (thay thế sau này nếu cần) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center h-28 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
            <p className="text-xl text-gray-400">Biểu đồ</p>
          </div>
          <div className="flex items-center justify-center h-28 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
            <p className="text-xl text-gray-400">Thống kê khác</p>
          </div>
        </div>
      </div>
    </div>
  );
}
