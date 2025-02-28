import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAddMovie = createAsyncThunk("addMovieSlice/fetchAddMovie", async (movie, {rejectWithValue})=>{
    try {
        const result = await api.post(`QuanLyPhim/ThemPhimUploadHinh`, movie );

        return result.data.content
        
    } catch (error) {
        return rejectWithValue(error);
        
    }
})
const initialState = {
    loading:false,
    data: null,
    error: null,

};
const addMovieSlice = createSlice({
    name:"addMovieSlice",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(fetchAddMovie.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchAddMovie.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload
            
        });
        builder.addCase(fetchAddMovie.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
}

});

export default addMovieSlice.reducer;
