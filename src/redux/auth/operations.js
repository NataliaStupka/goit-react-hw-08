import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//працюємо через окремо створенний axios (уникаємо 'конфлікту'). томущо axios один на весь проект
export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

//створюємо функцію (збереження токену) приймає token
//в місця де логінемось/реєструємся
const setAuthHeader = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
//при logout; очищаємо сторінку
const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = ``;
};

// === РЕГІСТРАЦІЯ (/users/signup - Create a new user)===
//credential - дані входу
export const register = createAsyncThunk(
  "auth/register",
  async (credential, thunkAPI) => {
    try {
      console.log("credential", credential); //name, email, password
      ///users/signup - маршрут
      const response = await goitApi.post("/users/signup", credential);

      setAuthHeader(response.data.token); //запам'ятовуємо token

      console.log("response.register", response); //token, name, email, password
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// === ЛОГІНІЗАЦИЯ ===
export const login = createAsyncThunk(
  "auth/login",
  async (credential, thunkAPI) => {
    try {
      const response = await goitApi.post("/users/login", credential);
      console.log("response.login", response.data); //token, user: email. password
      setAuthHeader(response.data.token); //запам'ятовуємо token (для виходу і т.д)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// === LOGOUT ===
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await goitApi.post("/users/logout");
    clearAuthHeader(); //очищаємо header при виході
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// === REFRESH === оновлення сторінки
//збереж.дані, при перезагрузці не потрібно знову логінізуватися
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    //thunkAPI.getState() - поверне весь store(auth(isLoggedIn, token), user, ...)
    const savedToken = thunkAPI.getState().auth.token; //отримуємо рядок token

    if (!savedToken) {
      return thunkAPI.rejectWithValue("Token is not exist!");
    }

    try {
      setAuthHeader(savedToken); // token
      const { data } = await goitApi.get("/users/current"); //запит за токеном
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
