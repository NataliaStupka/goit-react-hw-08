import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

//початковий стан користувача
const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false, //чи залогований
  isRefreshing: false, //стан оновлення сторінки(візуал)
};

//створюємо slice
const slice = createSlice({
  name: "auth",
  initialState,

  //pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("payload", action.payload); //token, user: ...
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      //при logout повертаємо початковий стан
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      //refresh
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
