/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actRegister } from "./slice"; // Import action đăng ký
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./../../../assets/images/logo.png";

export default function RegisterModal({ isOpen, onClose, onLogin }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authCustomerReducer);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setUser({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        hoTen: "",
      });
    }
  }, [isOpen]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(actRegister(user));

    if (actRegister.fulfilled.match(resultAction)) {
      toast.success("Đăng ký thành công!");
      setTimeout(() => {
        onClose();
        onLogin();
      }, 1000);
    } else {
      const errorMessage = resultAction.payload || "Đăng ký thất bại!";
      const newErrors = {};
      if (errorMessage.includes("Email")) newErrors.email = errorMessage;
      if (errorMessage.includes("Tài khoản")) newErrors.taiKhoan = errorMessage;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (state.isRegistered) {
      onClose();
      onLogin();
    }
  }, [state.isRegistered, onClose, onLogin]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative overflow-y-auto max-h-[80vh] min-h-[300px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Nút đóng modal */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Tiêu đề và Logo */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <img className="h-40 -mb-11" src={logo} alt="pandacinemelogo" />
              <h2 className="text-xl font-bold text-gray-700 text-center mb-5">
                Đăng Ký Tài Khoản
              </h2>
            </div>

            {/* Form đăng ký */}
            <form onSubmit={handleRegister} className="space-y-3">
              {[
                { label: "Tài khoản", name: "taiKhoan", type: "text" },
                { label: "Mật khẩu", name: "matKhau", type: "password" },
                { label: "Email", name: "email", type: "email" },
                { label: "Số điện thoại", name: "soDt", type: "text" },
                { label: "Họ tên", name: "hoTen", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    placeholder={`Nhập ${label.toLowerCase()}`}
                    type={type}
                    name={name}
                    value={user[name]}
                    onChange={handleOnChange}
                    required
                    className="w-full p-2 border rounded text-black"
                  />
                  {errors[name] && (
                    <span className="text-red-600 text-sm">{errors[name]}</span>
                  )}
                </div>
              ))}

              {/* Nút đăng ký */}
              <button
                type="submit"
                className="w-full bg-[#675496] hover:bg-[#402F67] transition-colors text-white p-2 rounded mt-2"
                disabled={state.loading}
              >
                {state.loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </form>

            {/* Đã có tài khoản? Đăng nhập */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Bạn đã có tài khoản?</p>
              <button
                onClick={onLogin}
                className="mt-2 w-full border border-[#675496] hover:bg-[#402F67] hover:text-white transition-colors text-[#675496] p-1 rounded"
              >
                Đăng nhập
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <ToastContainer />
    </AnimatePresence>
  );
}
