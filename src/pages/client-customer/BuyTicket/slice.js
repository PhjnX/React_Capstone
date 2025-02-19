import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchShowtimes = createAsyncThunk(
  "buyTicket/fetchShowtimes",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const postTicketManagement = createAsyncThunk(
  "buyTicket/postTicketManagement",
  async (ticketInfo, { rejectWithValue, dispatch, getState }) => {
    try {
      // Gọi API để đặt vé
      const result = await api.post("/QuanLyDatVe/DatVe", ticketInfo);

      if (result.data.statusCode === 200) {
        const bookedSeats = ticketInfo.danhSachVe;

        const currentShowtimes = getState().buyTicketSlice.showtimes;
        if (currentShowtimes) {
          const updatedSeats = currentShowtimes.danhSachGhe.map((seat) => {
            const isBooked = bookedSeats.some(
              (bookedSeat) => bookedSeat.maGhe === seat.maGhe
            );
            return isBooked ? { ...seat, daDat: true } : seat;
          });
          dispatch(
            updateShowtimes({ ...currentShowtimes, danhSachGhe: updatedSeats })
          );
        }

        return result.data.content;
      } else {
        return rejectWithValue(result.data.message || "Đặt vé thất bại");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.content || error.message);
    }
  }
);

const initialState = {
  showtimes: null,
  userBookTickets: [],
  loading: false,
  error: null,
};

const buyTicketSlice = createSlice({
  name: "buyTicket",
  initialState,
  reducers: {
    updateShowtimes: (state, action) => {
      state.showtimes = action.payload;
    },
    resetBuyTicket: (state) => {
      state.showtimes = null;
      state.userBookTickets = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = action.payload;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postTicketManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTicketManagement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postTicketManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserBookTickets, updateShowtimes, resetBuyTicket } =
  buyTicketSlice.actions;
export default buyTicketSlice.reducer;
