import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import logo from "./../../../assets/images/logo.png";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";
import { logout } from "../LoginModal/slice";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const dispatch = useDispatch();
  const { isLoggedIn, data } = useSelector(
    (state) => state.authCustomerReducer
  );

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function render NavLink với logic active
  const renderNavLink = (to, label) => (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `hover:text-[#AC98E0] transition font-medium ${
          isActive
            ? "text-[#AC98E0] font-bold"
            : "text-gray-900 dark:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav className="bg-white border-gray-200 dark:bg-gray-900 relative z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-4">
          <a href="/" className="flex items-center space-x-3">
            <img src={logo} className="h-36 w-auto" alt="PandaCinema Logo" />
          </a>

          <button
            className="md:hidden text-gray-600 dark:text-white z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div
            className={`${
              isOpen
                ? "fixed top-0 right-0 h-full w-2/5 bg-white dark:bg-gray-900 shadow-lg translate-x-0"
                : "hidden"
            } transition-transform duration-300 ease-in-out md:relative md:w-auto md:flex md:bg-transparent md:translate-x-0 z-50`}
          >
            <button
              className="absolute top-5 right-5 text-gray-600 dark:text-white md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            <ul className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 font-medium p-8 md:p-0 text-inherit">
              <li>{renderNavLink("/", "Home")}</li>
              <li>{renderNavLink("/about", "About")}</li>
              <li>{renderNavLink("/support", "Support")}</li>
              <li>{renderNavLink("/promotion", "Promotions")}</li>
              <li>{renderNavLink("/auth", "Admin Page")}</li>

              {isLoggedIn && (
                <li className="md:hidden">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                  >
                    <User size={28} />
                    <span>{data?.taiKhoan}</span>
                  </button>
                  {showUserMenu && (
                    <div className="mt-2 w-40 bg-white border rounded-lg shadow-lg">
                      <button
                        onClick={() => {
                          dispatch(logout());
                          setShowUserMenu(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>

          <div className="hidden md:block" ref={userMenuRef}>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#AC98E0]"
                >
                  <User size={28} />
                  <span>{data?.taiKhoan}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={() => {
                        dispatch(logout());
                        localStorage.removeItem("userAccount");
                        setShowUserMenu(false);
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 text-gray-700 dark:text-white hover:text-[#AC98E0] cursor-pointer"
              >
                <User size={20} /> Đăng nhập
              </span>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}
