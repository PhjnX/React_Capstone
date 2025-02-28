import React from "react";
import Navbar from "./component-admin/navbar";
import SideBar from "./component-admin/Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminTemplate() { 
  const {data} = useSelector((state)=> state.authReducer);
  if(!data) return <Navigate to="/auth"/>

  return (
    <div className="flex h-screen">
      {/* Sidebar cố định bên trái */}
      <div className="w-64 fixed h-screen bg-gray-800">
        <SideBar />
      </div>

      {/* Khu vực nội dung chính */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar luôn trên cùng */}
        <Navbar />

        {/* Nội dung động thay đổi theo từng trang */}
        <div className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
