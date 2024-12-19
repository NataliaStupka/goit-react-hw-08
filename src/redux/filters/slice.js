import { createSlice } from "@reduxjs/toolkit";

//початковий стан
const initialState = {
  searchContact: "", // що шукаємо
};

//створюємо слайс
const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    //actions
    changeFilter: (state, action) => {
      state.searchContact = action.payload;
    },
  },
});

//action
export const { changeFilter } = slice.actions;

//selector --> selector.js

//експортуємо slice (reducer)
export const filterReducer = slice.reducer; //використовуємо в //обгортка persist
