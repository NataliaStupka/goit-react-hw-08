//selectors (useSelector) - використання на компоненті
//state - загальний(store), contact - назва слайсу, items/filter- занчення в initialState

import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items; //контакти

//filterSlice
export const selectSearchFilter = (state) => state.filter.searchContact; //пошук

//складений селектор, пошук/фільтрація контактів
export const selectFilteredContactsMemo = createSelector(
  [selectContacts, selectSearchFilter],
  (contacts, filter) => {
    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter) //пошук за номером
    );
  }
);
//selectFilteredContacts - передамо в ContactList для рендера контактів
//замість selectContacts

//Number(item.number)
