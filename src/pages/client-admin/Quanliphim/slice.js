import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";

export const fetchMovieList = createAsyncThunk("movie/fetchMovieList",async (_dirname ,{rejectWithValue})=>{
    try{
       const result = await api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`)
       return result.data.content

    }catch (error){
        return rejectWithValue(error.massage)


    }
})

const initialState = {
    loading: false,
    data: null,
    error: null
};

const listMovieSlice = createSlice({
    name: "listMovieSlice",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
      builder.addCase(fetchMovieList.pending,(state)=>{
        state.loading = true;
      });
      builder.addCase(fetchMovieList.fulfilled,(state,action)=>{
        state.loading = false;
        state.data = action.payload;
      });
        builder.addCase(fetchMovieList.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }); 

      

    }
});

export default listMovieSlice.reducer;