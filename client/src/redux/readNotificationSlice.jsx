import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../api/apiService";

export const readNotification = createAsyncThunk(
  "notification/readNotification",
  async (notificationId) => {
    try {
      await ApiService.readNotification(notificationId);
    } catch (error) {
      console.log(error);
    }
  }
);

const readNotificationSlice = createSlice({
  name: "notification",
  initialState: {
    isReadingNotifiation: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(readNotification.pending, (state, action) => {
        state.isReadingNotifiation = true;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        state.isReadingNotifiation = false;
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.isReadingNotifiation = true;
      });
  },
});

export default readNotificationSlice.reducer;
