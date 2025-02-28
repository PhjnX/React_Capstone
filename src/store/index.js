import { configureStore } from "@reduxjs/toolkit";
import movieListReducer from "../pages/client-admin/Quanliphim/slice";
import authReducer from "../pages/client-admin/AuthPage/slice";
import userReducer from "../pages/client-admin/UserPage/slice";
import addMovieReducer from "../pages/client-admin/AddMovie/slice"
import deleteReducer from "../pages/client-admin/Quanliphim/delete"
import showTimeReducer from "../pages/client-admin/ShowTime/slice";
// import cumRapReducer from "../pages/client-admin/ShowTime/sliceCumRap"
import cinemaReducer from "../pages/client-admin/ShowTime/slice"

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
    movieListReducer,
    authReducer,  
    userReducer,
    addMovieReducer,
    deleteReducer,
    cinemaReducer,
    showTimeReducer,
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
