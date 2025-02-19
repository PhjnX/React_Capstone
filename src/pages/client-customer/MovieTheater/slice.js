// slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Fetch hệ thống rạp
export const fetchCinemaSystems = createAsyncThunk(
  "movieTheater/fetchCinemaSystems",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyRap/LayThongTinHeThongRap");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch cụm rạp theo hệ thống rạp
export const fetchCinemasBySystem = createAsyncThunk(
  "movieTheater/fetchCinemasBySystem",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      );
      return { maHeThongRap, data: result.data.content };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch lịch chiếu phim theo hệ thống rạp
export const fetchShowtimes = createAsyncThunk(
  "movieTheater/fetchShowtimes",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`
      );

      console.log("📢 API Response Raw:", result);

      if (!result.data?.content || result.data.content.length === 0) {
        console.warn("⚠️ API không có lịch chiếu hoặc trả về rỗng!");
        return rejectWithValue("Không có lịch chiếu!");
      }

      console.log("✅ API Response Processed:", result.data.content);
      return { maHeThongRap, data: result.data.content };
    } catch (error) {
      console.error("❌ API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  cinemaSystems: [],
  cinemas: {},
  showtimes: {},
  loading: false,
  error: null,
};

const movieTheaterSlice = createSlice({
  name: "movieTheater",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemaSystems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemaSystems.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaSystems = action.payload;
      })
      .addCase(fetchCinemaSystems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCinemasBySystem.fulfilled, (state, action) => {
        state.cinemas[action.payload.maHeThongRap] = action.payload.data;
      })
      .addCase(fetchCinemasBySystem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        console.log("✅ API Response Processed in Redux:", action.payload);
        state.showtimes[action.payload.maHeThongRap] = action.payload.data;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetError } = movieTheaterSlice.actions;
export default movieTheaterSlice.reducer;
