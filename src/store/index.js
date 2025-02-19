import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./../pages/client-customer/Carousel/slice";
import listMovieReducer from "./../pages/client-customer/ListMoviePage/slice";
import authCustomerReducer from "./../pages/client-customer/LoginModal/slice";
import registerSliceReducer from "./../pages/client-customer/RegisterModal/slice";
import detailMovieReducer from "./../pages/client-customer/MovieDetailPage/slice";
import movieTheaterReducer from "./../pages/client-customer/MovieTheater/slice";
import theaterByMovieReducer from "./../pages/client-customer/TheaterByMovie/slice";
import buyTicketSlice from "./../pages/client-customer/BuyTicket/slice";

export const store = configureStore({
  reducer: {
    // Add your child reducer here
    bannerReducer,
    listMovieReducer,
    authCustomerReducer,
    registerSliceReducer,
    detailMovieReducer,
    movieTheaterReducer,
    theaterByMovieReducer,
    buyTicketSlice,
  },
});
