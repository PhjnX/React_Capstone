import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const actRegister = createAsyncThunk(
  "auth/actRegister",
  async (user, { rejectWithValue }) => {
    try {
      console.log("Đang gửi request đến:", "/QuanLyNguoiDung/DangKy", user);
      const result = await api.post("/QuanLyNguoiDung/DangKy", user);
      return result.data.content;
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response);
      return rejectWithValue(
        error.response?.data?.content || "Đăng ký thất bại!"
      );
    }
  }
);

const initialState = {
  loading: false,
  isRegistered: false,
  error: null,
  errors: {},
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRegistered = false;
        state.errors = {}; // Reset lỗi
      })
      .addCase(actRegister.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(actRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.errors = action.payload;
      });
  },
});

export default registerSlice.reducer;
