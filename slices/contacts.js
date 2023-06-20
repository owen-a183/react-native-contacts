import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContacts = createAsyncThunk(
  "contacts/getContacts", 
  async () => {
    try {
      const response = await axios.get(
        "https://contact.herokuapp.com/contact"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contact: {},
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.isLoading = false;
        state.hasError = false
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.hasError = true
        state.isLoading = false;
      })
  }
});

// Selectors
export const selectContacts = state => state?.contact?.contact;
export const selectLoadingState = state => state?.contact?.isLoading;
export const selectErrorState = state => state?.contact?.hasError;

export default contactSlice.reducer;