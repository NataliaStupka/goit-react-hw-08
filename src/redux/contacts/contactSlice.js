import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { logout } from "../auth/operations";

//початковий стан контакти
const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,

  //відбувається за межами
  extraReducers: (builder) => {
    builder
      //--запит
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      //////при logout очищую сторінку з контактами
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      //--видалення контакта
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload.id); //локально видаляємо на стороні клієнта
      })
      //--додавання контакту
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      //-- addMatcher --//
      //== стан в очікуванні - pending
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending
        ),
        (state, action) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      //== стан успіх - fulfilled
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      //== стан помилка - regected
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

//selector --> selector.js

//експортуємо slice (reducer) в store
export const contactReducer = slice.reducer;
