import { configureStore } from "@reduxjs/toolkit";
import movieListReducer from "../pages/client-admin/Quanliphim/slice";
import authReducer from "../pages/client-admin/AuthPage/slice";
import userReducer from "../pages/client-admin/UserPage/slice";
import addMovieReducer from "../pages/client-admin/AddMovie/slice"
import deleteReducer from "../pages/client-admin/Quanliphim/delete"
// import showTimeReducer from "../pages/client-admin/ShowTime/slice";
// import cumRapReducer from "../pages/client-admin/ShowTime/sliceCumRap"
import cinemaReducer from "../pages/client-admin/ShowTime/slice2"
export const store = configureStore({
  reducer: {
    movieListReducer,
    authReducer,  
    userReducer,
    addMovieReducer,
    deleteReducer,

    cinemaReducer,
    // Add your child reducer here
  },
});
