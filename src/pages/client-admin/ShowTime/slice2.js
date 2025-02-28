import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


// Async Thunks
export const fetchHeThongRap = createAsyncThunk(
  "cinema/fetchHeThongRap",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`QuanLyRap/LayThongTinHeThongRap`);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCumRap = createAsyncThunk(
  "cinema/fetchCumRap",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const response = await api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const taoLichChieu = createAsyncThunk(
  "cinema/taoLichChieu",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`QuanLyDatVe/TaoLichChieu`, data);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    heThongRap: [],
    cumRap: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeThongRap.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeThongRap.fulfilled, (state, action) => {
        state.loading = false;
        state.heThongRap = action.payload;
      })
      .addCase(fetchHeThongRap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCumRap.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCumRap.fulfilled, (state, action) => {
        state.loading = false;
        state.cumRap = action.payload;
      })
      .addCase(fetchCumRap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(taoLichChieu.pending, (state) => {
        state.loading = true;
      })
      .addCase(taoLichChieu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(taoLichChieu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cinemaSlice.reducer;
