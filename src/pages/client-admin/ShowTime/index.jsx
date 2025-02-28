    // import React, { useEffect, useState } from 'react'
    // import { useDispatch, useSelector } from 'react-redux';
    // // import { useParams } from 'react-router-dom'
    // import { fetchShowTime } from './slice';
    // import { fetchListCumRap } from './sliceCumRap';

    // export default function ShowTime() {
    //     const dispatch = useDispatch();
    //     const heThongRap = useSelector((state)=> state.showTimeReducer.list);
    //     const cumRap = useSelector((state)=> state.cumRapReducer.list);
    //     const [selectHeThong, setSelectHeThong] = useState();
    //     const [selectCumRap,setSelectCumRap] = useState()
    //     console.log(heThongRap);
    //     console.log(cumRap)

    //     useEffect(()=>{
    //         dispatch(fetchShowTime())
    //     },[dispatch]);
        
    //     const handleOnChange = (e)=>{
    //     const maHeThong = e.target.value;
    //     console.log("🎬 Mã hệ thống rạp đang chọn:", maHeThong);
    //     setSelectHeThong(maHeThong);
        
    //     const handleOnChangeCumRap = (e) => {
    //         setSelectCumRap(e.target.value);
            
    //     };
        


    //     }

    // return (
    //     <div className="bg-gray-100 flex justify-center items-center min-h-screen">
    //     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    //         <h2  className="text-xl font-semibold mb-4 text-center">
    //             Tạo lịch chiếu Aven
    //         </h2>
    //         <div>
    //             <img  src="https://via.placeholder.com/150"
    //                         alt="Movie Poster"
    //                         className="w-40 rounded-lg shadow-md" />
    //         </div>
    //         <form action="" className="space-y-4">
    //             <div>
    //                 <label  className="block text-gray-700 font-medium" htmlFor="">Hệ thống rạp</label>
    //                 <select onChange={handleOnChange} name="tenHeThongRap" id="">
    //                     <option value=""> Chọn hệ thống rạp</option>
    //                     {heThongRap.map((rap)=>(
                             
    //                          <option key={rap.maHeThong} value={rap.maHeThong}>{rap.tenHeThongRap}</option>
    //                          )
    //                     )}
    //                     </select>
                    
    //             </div>
    //             <div>
    //                 <label className="block text-gray-700 font-medium"  htmlFor="">Cụm rạp</label>
    //                 <select  name="maCumRap"  id="">
    //                     <option value="">Chọn cụm rạp</option>
    //                     {cumRap.map((cumRap)=>(
    //                     <option key={cumRap.maHeThong} value={cumRap.maHeThong}>{cumRap.tenCumRap}</option>)
                            
                            
    //                     )}
    //                 </select>
    //             </div>
    //             <div>
    //         <label htmlFor="ngayKhoiChieu" className="block font-medium">Ngày khởi chiếu:</label>
    //         <input type="date" name='ngayChieuGioChieu' className="w-full p-2 border rounded-md" />
    //         </div>
    //             <div>
    //             <label className="block text-gray-700 font-medium">
    //                             Giá vé:
    //                         </label>
    //                         <input onC type='number' name='giaVe'
    //                             className="mt-1 block w-full p-2 border rounded-lg"
    //                         />
    //             </div>
    //             <form action="">
    //             <button
    //                         type="submit"
    //                         className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow"
    //                     >
    //                         Tạo lịch chiếu
    //                     </button>
    //             </form>
    //         </form>
    //     </div>

    //     </div>
    // )
    // }
