import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchDelete = createAsyncThunk(
    "deleteMovie/fetchDelete",
    async (maPhim, { rejectWithValue }) => {
        try {
            await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
            return maPhim; // Trả về mã phim để cập nhật Redux store
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }
);

const initialState = {
    loading: false,
    data: [],
    error: null
};

const deleteSlice = createSlice({
    name: "deleteSlice",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDelete.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.filter((movie) => movie.maPhim !== action.payload); // Cập nhật Redux store
        });
        builder.addCase(fetchDelete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default deleteSlice.reducer;
