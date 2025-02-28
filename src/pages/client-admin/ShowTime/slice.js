import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * API 1: Lấy danh sách hệ thống rạp
 *   GET: /QuanLyRap/LayThongTinHeThongRap
 */
export const fetchHeThongRap = createAsyncThunk(
  "showTime/fetchHeThongRap",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("QuanLyRap/LayThongTinHeThongRap");
      return res.data.content; // Mảng các hệ thống rạp
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.content || error.message
      );
    }
  }
);

/**
 * API 2: Lấy danh sách cụm rạp theo hệ thống rạp
 *   GET: /QuanLyRap/LayThongTinCumRap?maHeThongRap=...
 */
export const fetchCumRap = createAsyncThunk(
  "showTime/fetchCumRap",
  async (maHeThongRap, thunkAPI) => {
    try {
      const res = await api.get(
        `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      );
      return res.data.content; // Mảng các cụm rạp của hệ thống
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.content || error.message
      );
    }
  }
);

/**
 * API 3: Tạo lịch chiếu
 *   POST: /QuanLyDatVe/TaoLichChieu
 *   Body ví dụ:
 *     {
 *       "maPhim": 1283,
 *       "ngayChieuGioChieu": "string",
 *       "maRap": "string",
 *       "giaVe": 0
 *     }
 */
export const createShowTime = createAsyncThunk(
  "showTime/createShowTime",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("QuanLyDatVe/TaoLichChieu", formData);
      return res.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.content || error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  heThongRapList: [], // Lưu danh sách hệ thống rạp
  cumRapList: [], // Lưu danh sách cụm rạp tương ứng hệ thống rạp đã chọn
  createResult: null, // Kết quả trả về sau khi tạo lịch chiếu
};

const showTimeSlice = createSlice({
  name: "showTimeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 1) fetchHeThongRap
    builder.addCase(fetchHeThongRap.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHeThongRap.fulfilled, (state, action) => {
      state.loading = false;
      state.heThongRapList = action.payload; // Lưu hệ thống rạp
    });
    builder.addCase(fetchHeThongRap.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // 2) fetchCumRap
    builder.addCase(fetchCumRap.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCumRap.fulfilled, (state, action) => {
      state.loading = false;
      state.cumRapList = action.payload; // Lưu cụm rạp
    });
    builder.addCase(fetchCumRap.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // 3) createShowTime
    builder.addCase(createShowTime.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createShowTime.fulfilled, (state, action) => {
      state.loading = false;
      state.createResult = action.payload;
    });
    builder.addCase(createShowTime.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default showTimeSlice.reducer;
