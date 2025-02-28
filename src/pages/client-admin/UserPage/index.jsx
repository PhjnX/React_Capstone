import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUser } from "./slice"; // Import action call API

export default function UserPage() {
    const state = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const [search, setSearch] = useState(""); // Lưu từ khóa tìm kiếm

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch(fetchListUser(search)); // Gọi API tìm kiếm
        }, 500); // Chờ 500ms trước khi gọi API (debounce)

        return () => clearTimeout(delayDebounce); // Hủy bỏ gọi API nếu nhập tiếp
    }, [search, dispatch]);

    const renderUser = () => {
        return state?.data?.map((user) => (
            <tr key={user.taiKhoan} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.taiKhoan}
                </th>
                <td className="px-6 py-4">{user.hoTen}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                    <span className={user.maLoaiNguoiDung === "KhachHang" ? "text-green-500" : "text-red-500"}>
                        {user.maLoaiNguoiDung}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-red-500 text-center mb-5">Danh sách user</h1>

            {/* Thanh tìm kiếm */}
            <div className="mb-5 flex justify-end">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tài khoản</th>
                            <th scope="col" className="px-6 py-3">Họ tên</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Mã loại người dùng</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUser()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
