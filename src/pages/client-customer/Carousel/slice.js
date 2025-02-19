import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Fetch dữ liệu banner
export const fetchBanner = createAsyncThunk(
  "bannerPage/fetchBanner",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/QuanLyPhim/LayDanhSachBanner");
      return data.content;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

const bannerSlice = createSlice({
  name: "bannerPageSlice",
  initialState: { loading: false, banners: [], error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanner.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.banners = payload;
      })
      .addCase(fetchBanner.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default bannerSlice.reducer;
