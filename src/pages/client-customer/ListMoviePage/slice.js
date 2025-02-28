  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import api from "./../../../services/api";

  export const fetchListMovie = createAsyncThunk(
    "listMoviePage/fetchListMovie",
    async ({ page, pageSize }, { rejectWithValue }) => {
      try {
        const result = await api.get(
          `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
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
    prevData: null,
    error: null,
  };

  const listMoviePageSlice = createSlice({
    name: "listMoviePage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchListMovie.pending, (state) => {
          state.loading = true;
          if (state.data) {
            state.prevData = state.data;
          }
        })
        .addCase(fetchListMovie.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.prevData = action.payload || state.prevData;
        })
        .addCase(fetchListMovie.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export default listMoviePageSlice.reducer;
