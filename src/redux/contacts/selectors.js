//selectors (useSelector) - використання на компоненті
//state - загальний(store), contact - назва слайсу, items/filter- занчення в initialState

//contactSlice
export const selectContacts = (state) => state.contacts.items; //контакти
export const selectIsError = (state) => state.contacts.isError;
export const selectIsLoading = (state) => state.contacts.isLoading;
