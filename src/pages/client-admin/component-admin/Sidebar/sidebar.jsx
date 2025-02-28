import React from 'react'
import { Link } from 'react-router-dom' 
import { TiUserAdd } from "react-icons/ti";
import { MdMovie } from "react-icons/md";
import { RiVideoAddFill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";




    // import thư viện Link từ react-router-dom 

export default function SideBar() {
  return (
    <div>
        
<div>
  <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
    </svg>
  </button>
  <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 bg-red-600">
      <a className="flex items-center ps-2.5 mb1">
        <img src="./../src/assets/image/logo-B.png" alt="" />
      </a>
      <ul className="space-y-2 font-medium">
        <li>
          <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           
            <Link to={`/admin/dashboard`}> Dashboard</Link>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             <MdMovie className='mr-2'/>
            <Link to={`/admin/quanliphim`}>Quản lí phim</Link>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            
             <RiVideoAddFill className='mr-2'/>
            <Link to={`/admin/add-movie`}>Thêm phim</Link>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
             <TiUserAdd className='mr-2'/>
            <Link  to={`/admin/add-user`}>Thêm người dùng</Link>
          </a>
          <a href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <TiUser className='mr-2'/>
             <Link to={`/admin/user`} >Quản lí người dùng</Link>

          </a>
        </li>
        
      </ul>
    </div>
  </aside>
</div>


    </div>
  )
}
