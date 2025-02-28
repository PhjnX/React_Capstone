import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Fetch chi tiết phim
export const fetchDetailMovie = createAsyncThunk(
  "detailMoviePage/fetchDetailMovie",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchShowtimes = createAsyncThunk(
  "detailMoviePage/fetchShowtimes",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
  showtimes: null,
  showtimesLoading: false,
  showtimesError: null,
};

const detailMoviePageSlice = createSlice({
  name: "detailMoviePage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetailMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShowtimes.pending, (state) => {
        state.showtimesLoading = true;
        state.showtimesError = null;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.showtimesLoading = false;
        state.showtimes = action.payload;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.showtimesLoading = false;
        state.showtimesError = action.payload;
      });
  },
});

export default detailMoviePageSlice.reducer;
