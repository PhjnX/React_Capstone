import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Async action: Gửi request login
export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      console.log("Đang gửi request đến:", "/QuanLyNguoiDung/DangNhap", user);
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      const userInfo = result.data.content;

      console.log("Dữ liệu từ API:", userInfo);

      if (userInfo.maLoaiNguoiDung !== "KhachHang") {
        return rejectWithValue("Chỉ khách hàng mới có thể đăng nhập!");
      }

      return userInfo;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response);
      return rejectWithValue(
        error.response?.data?.content || "Đăng nhập thất bại!"
      );
    }
  }
);

const userAccount = localStorage.getItem("userAccount")
  ? JSON.parse(localStorage.getItem("userAccount"))
  : null;

const initialState = {
  loading: false,
  data: userAccount,
  isLoggedIn: !!userAccount,
  error: null,
};

const authCustomerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      state.error = null; // Reset lỗi khi logout
      localStorage.removeItem("userAccount");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isLoggedIn = true;
        state.error = null;

        localStorage.setItem("userAccount", JSON.stringify(action.payload));
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authCustomerSlice.actions;
export default authCustomerSlice.reducer;
