import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin, clearError } from "./slice";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./../../../assets/images/logo.png";
import { X, Loader } from "lucide-react";

// eslint-disable-next-line react/prop-types
export default function LoginModal({ isOpen, onClose, onRegister }) {
  const dispatch = useDispatch();
  const { isLoggedIn, loading, error } = useSelector(
    (state) => state.authCustomerReducer
  );

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  useEffect(() => {
    if (isLoggedIn) onClose(); // Chỉ đóng modal khi đăng nhập thành công
  }, [isLoggedIn, onClose]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (error) dispatch(clearError()); // Xóa lỗi khi người dùng nhập lại
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(actLogin(user));
  };

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-nunito"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col gap-2 justify-center items-center">
              <img className="h-40 -mb-11" src={logo} alt="pandacinemelogo" />
              <h2 className="text-xl font-bold text-[#4a4a4a] text-center mb-5">
                Đăng Nhập Tài Khoản
              </h2>
            </div>

            {error && (
              <motion.div
                className="text-red-600 mb-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin}>
              <label
                htmlFor="taiKhoan"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Tài khoản
              </label>
              <input
                id="taiKhoan"
                placeholder="Nhập tài khoản"
                type="text"
                name="taiKhoan"
                value={user.taiKhoan}
                onChange={handleOnChange}
                required
                className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#675496] mb-2"
              />

              <div className="mb-3">
                <label
                  htmlFor="matKhau"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <input
                  id="matKhau"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  name="matKhau"
                  value={user.matKhau}
                  onChange={handleOnChange}
                  required
                  className="w-full p-2 border rounded text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#675496] hover:bg-[#402F67] transition-colors text-white p-2 rounded mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader size={20} className="animate-spin mx-auto" />
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Bạn chưa có tài khoản?</p>
              <button
                onClick={onRegister}
                className="mt-2 w-full border border-[#675496] hover:bg-[#402F67] hover:text-white transition-colors text-[#675496] p-1 rounded"
              >
                Đăng ký
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
