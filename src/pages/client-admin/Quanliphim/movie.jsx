import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelete } from './delete';
import { Link } from 'react-router-dom';



export default function Movie({ movie }) {
  const dispatch = useDispatch();
  const {movies, loading, error} = useSelector((state)=> state.deleteReducer)
  const handleDelete = (maPhim)=>{
    if(window.confirm("Bạn có chắc muốn xóa phim này")){
      dispatch(fetchDelete(maPhim))
    };
    setTimeout(()=>{
      window.location.reload()
    },500)
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="w-1/6 px-6 py-3">Mã phim</th>
            <th className="w-1/6 px-6 py-3">Hình ảnh</th>
            <th className="w-1/4 px-6 py-3">Tên phim</th>
            <th className="w-1/3 px-6 py-3">Mô tả</th>
            <th className="w-1/6 px-6 py-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{movie.maPhim}</td>
            <td className="px-6 py-4 flex justify-center">
              <div className="w-20 h-28 overflow-hidden flex items-center justify-center">
                <img className="w-full h-full object-cover rounded-md" src={movie.hinhAnh} alt={movie.tenPhim} />
              </div>
            </td>
            <td className="px-6 py-4">{movie.tenPhim}</td>
            <td className="px-6 py-4 text-left">
              <p className="line-clamp-2 text-gray-700 dark:text-white">{movie.moTa}</p>
            </td>
            <td className="px-6 py-4">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <div className='flex justify-center w-full'>
              <MdDelete onClick={()=> handleDelete(movie.maPhim)}  className='text-red-500 text-xl'  />
             <Link to={`/admin/show-time`}>
             <FaEdit  className='text-blue-500 text-xl' />
             </Link>

               </div>

              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
