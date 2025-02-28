import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "./slice";
import { Navigate } from "react-router-dom";
export default function AuthPage() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actLogin(user));
  };
  if(state.data){
    return <Navigate to="/admin/dashboard"/>
  }
  console.log(state);
  
  const handleErrorMessage = () => {
    const { error } = state;
    if (!error) return "";
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{error.response.data.content}</span>
      </div>
    );
  };


  return (
    <div className="flex items-center justify-center h-screen bg-red-500">
      <div className="bg-black p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Đăng nhập</h2>
      


      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        {handleErrorMessage()}
        <div className="mb-5">
          <label  className="block mb-2 text-sm font-medium text-white dark:text-white">Tài khoản</label>
          <input onChange={handleOnChange} name="taiKhoan" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Mật khẩu</label>
          <input onChange={handleOnChange} name="matKhau" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
      </form>
      </div>


    </div>
  );
}
