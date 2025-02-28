import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState(null);

    // Lấy thông tin user khi component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        setUserLogin(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userInfo"); // Xóa user khỏi localStorage
        setUserLogin(null); // Cập nhật state để giao diện phản ứng
        navigate("/auth", { replace: true }); // Chuyển hướng ngay lập tức

        // Reload trang để đảm bảo user bị đá ra
        setTimeout(() => {
            window.location.href = "/auth";
        }, 100);
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="http://localhost:5175" className="flex items-center space-x-3">
                        <span className="self-center text-2xl font-semibold dark:text-white">PandaMovie</span>
                    </a>
                    <div className="flex items-center space-x-6">
                        {userLogin && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600 dark:text-white">{userLogin.hoTen}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
