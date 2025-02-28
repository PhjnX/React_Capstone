import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { content } from "flowbite-react/tailwind";


export const actLogin = createAsyncThunk("auth/actLogin",async (user,{rejectWithValue})=>{
    try {
        const result  = await api.post(`/QuanLyNguoiDung/DangNhap`,user);
        const userInfo = result.data.content;
        if (userInfo.maLoaiNguoiDung === "khachHang"){
            return rejectWithValue({
                response:{
                    data:{
                        content:"Bạn không có quyền truy cập"
                    }
                }
            });
        };
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
         return result.data.content
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
    
});
const userInfo = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null;

const initialState = {
    loading: false,
    data: userInfo,
    error: null 
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(actLogin.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(actLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(actLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;   
        });

    }
});
export default authSlice.reducer;