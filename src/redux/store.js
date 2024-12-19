import { configureStore } from "@reduxjs/toolkit";

import { contactReducer } from "./contacts/slice";
import { filterReducer } from "./filters/slice"; //reducer filter
import { authReducer } from "./auth/slice";

//-- persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token"], //зберігаємо тільки токен, для оновлення сторінки
};
const persistedReducer = persistReducer(persistConfig, authReducer);
//--

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
    auth: persistedReducer,
  },
  //--- persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //-----==
});

//--- persist
export const persistor = persistStore(store);
