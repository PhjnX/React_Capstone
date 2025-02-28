import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Fetch hệ thống rạp
export const fetchCinemaSystems = createAsyncThunk(
  "theaterByMovie/fetchCinemaSystems",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyRap/LayThongTinHeThongRap");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch lịch chiếu chỉ của phim được click vào
export const fetchShowtimesByMovie = createAsyncThunk(
  "theaterByMovie/fetchShowtimesByMovie",
  async (maPhim, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`
      );
      return { maPhim, data: result.data.content };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  cinemaSystems: [],
  showtimesByMovie: {},
  selectedTheater: null, 
  selectedBranch: null, 
  loading: false,
  error: null,
};

const theaterByMovieSlice = createSlice({
  name: "theaterByMovie",
  initialState,
  reducers: {
    setSelectedTheater: (state, action) => {
      state.selectedTheater = action.payload;
      state.selectedBranch = null;
    },
    setSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemaSystems.fulfilled, (state, action) => {
        state.cinemaSystems = action.payload;
      })
      .addCase(fetchShowtimesByMovie.fulfilled, (state, action) => {
        state.showtimesByMovie[action.payload.maPhim] = action.payload.data;
        if (
          !state.selectedTheater &&
          action.payload.data.heThongRapChieu.length > 0
        ) {
          state.selectedTheater =
            action.payload.data.heThongRapChieu[0].maHeThongRap;
        }
      })
      .addCase(fetchCinemaSystems.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchShowtimesByMovie.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedTheater, setSelectedBranch } =
  theaterByMovieSlice.actions;
export default theaterByMovieSlice.reducer;
