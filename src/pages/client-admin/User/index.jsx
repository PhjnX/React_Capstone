import React, { useState } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function Quanlinguoidung() {
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await api.post (`/QuanLyNguoiDung/ThemNguoiDung`, user);
      console.log(response);
      toast.success(response.data.message, {position:"bottom-right"})
      
    } catch (error) {
      console.log(error);
      const messageError =  error.response.data.content;
      console.log("messageError:", messageError)
      toast.error(messageError, {position:"bottom-right"})
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-red-600 text-4xl">Add User</h1>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Tên tài khoản</label>
          <input
            type="text"
            name="taiKhoan"
            value={user.taiKhoan}
            onChange={handleOnChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
          <input
            type="password"
            name="matKhau"
            value={user.matKhau}
            onChange={handleOnChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleOnChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
          <input
            type="text"
            name="soDt"
            value={user.soDt}
            onChange={handleOnChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Họ tên</label>
          <input
            type="text"
            name="hoTen"
            value={user.hoTen}
            onChange={handleOnChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Mã loại người dùng</label>
          <select
            name="maLoaiNguoiDung"
            value={user.maLoaiNguoiDung}
            onChange={handleOnChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          >
            
            <option value="KhachHang">Khách hàng</option>
            <option value="QuanTri">Quản trị</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Thêm người dùng
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}
