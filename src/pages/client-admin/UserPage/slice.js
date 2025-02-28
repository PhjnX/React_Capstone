import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Call API danh sách người dùng (hỗ trợ tìm kiếm)
export const fetchListUser = createAsyncThunk("user/fetchListUser", async (search = "", { rejectWithValue }) => {
    try {
        const url = search
            ? `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${search}`
            : `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`;

        const result = await api.get(url);
        return result.data.content;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
});

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchListUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
