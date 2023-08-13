import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../api/apiService";

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async () => {
    try {
      const response = await ApiService.fetchUserRequests();
      return response.data.request;
    } catch (error) {
      console.log(error);
    }
  }
);

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: false,
    isResponding: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default requestSlice.reducer;
