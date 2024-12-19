//запит GET, POST, DELETE

//import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../auth/operations";

//createAsyncThunk приймає рядок(що за операція), і асинхронну функцію запит;
//fetchContacts - викликаємо в contactList через dispatch та useEffect;
//thunkAPI - для error
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await goitApi.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const response = await goitApi.delete(`/contacts/${id}`);
      console.log("deleteData", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//додавання контакту
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const response = await goitApi.post(`/contacts`, body);
      console.log("addOperation:", body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
