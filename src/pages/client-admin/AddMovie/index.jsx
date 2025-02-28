import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react';
import { fetchAddMovie } from './slice';

export default function AddMovie() {
  const dispatch = useDispatch();
  const {status, error } = useSelector((state)=> state.addMovieReducer);
  const [movieData, setMovieData] = useState({
    tenPhim: "",
    moTa: "",
    ngayKhoiChieu:"",
    sapChieu:false,
    dangChieu:false,
    hot:false,
    danhGia:0,
    maPhim: "",
    hinhAnh: null,
  });
  const handleFileChange = (e) => {
    setMovieData({ ...movieData, hinhAnh: e.target.files[0] });
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("-").reverse().join("/");
  };
  const handleOnChange = (e) =>{
    const {name, value, type,checked} = e.target;
    setMovieData({
      ...movieData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("tenPhim", movieData.tenPhim);
    formData.append("moTa", movieData.moTa);
    formData.append("ngayKhoiChieu", formatDate(movieData.ngayKhoiChieu));
    formData.append("sapChieu",movieData.sapChieu);
    formData.append("dangChieu", movieData.dangChieu);
    formData.append("hot",movieData.hot);
    formData.append("danhGia", Number(movieData.danhGia));
    formData.append("maPhim", Number(movieData.maPhim));
    if(movieData.hinhAnh){
      formData.append("File", movieData.hinhAnh)
    };
    try {
      await dispatch(fetchAddMovie(formData)).unwrap();
      alert("Thêm phim thành công!");
    } catch (error) {
      alert("Thêm phim thất bại!");
    }

  }

  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">Thêm mới phim</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên phim */}
        <div>
          <label htmlFor="tenPhim" className=" font-medium text-black">Tên phim:</label>
          <input onChange={handleOnChange} name='tenPhim' type="text" className="w-full p-2 text-black rounded-md" />
        </div>

        {/* Trailer */}
        <div>
          <label htmlFor="trailer" className="block font-medium text-black">Trailer:</label>
          <input onChange={handleOnChange}name='trailer'  type="text" className="w-full p-2 border text-black rounded-md" />
        </div>

        {/* Mô tả */}
        <div>
          <label htmlFor="moTa" className="block font-medium text-black">Mô tả:</label>
          <input onChange={handleOnChange} name='moTa' type="text"  className="w-full p-2 border text-black rounded-md" />
        </div>

        {/* Ngày khởi chiếu */}
        <div>
          <label htmlFor="ngayKhoiChieu" className="block font-medium text-black">Ngày khởi chiếu:</label>
          <input onChange={handleOnChange} type="date" name='ngayKhoiChieu' className="w-full p-2 border text-black rounded-md" />
        </div>

        {/* Đang chiếu, Sắp chiếu, Hot */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <label htmlFor="dangChieu" className="mr-2 text-black">Đang chiếu:</label>
            <input onChange={handleOnChange} type="checkbox" name='dangChieu' className="w-5 h-5 text-black" />
          </div>

          <div className="flex items-center">
            <label htmlFor="sapChieu" className="mr-2 text-black">Sắp chiếu:</label>
            <input onChange={handleOnChange} type="checkbox" name='sapChieu' className="w-5 h-5 text-black" />
          </div>

          <div className="flex items-center">
            <label htmlFor="hot" className="mr-2 text-black">Hot:</label>
            <input onChange={handleOnChange} name='hot' type="checkbox"  className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Số sao */}
        <div>
          <label htmlFor="danhGia" className="block font-medium text-black">Số sao:</label>
          <input onChange={handleOnChange} name='danhGia' type="number"  className="w-full p-2 border rounded-md text-black" />
        </div>

        {/* Hình ảnh */}
        <div>
          <label htmlFor="hinhAnh" className="block font-medium text-black">Hình ảnh:</label>
          <input onChange={handleFileChange} name='hinhAnh' type="file" className="w-full p-2 border rounded-md text-black" />
          <img src="" alt="Preview" className="mt-2 w-40 h-auto rounded-md" />
        </div>

        {/* Nút Thêm phim */}
        <div className="flex justify-start">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Thêm phim
          </button>
        </div>
      </form>
    </div>
    
    

    
  )
}


