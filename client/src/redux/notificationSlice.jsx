import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../api/apiService";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userId) => {
    try {
      const response = await ApiService.fetchNotifications(userId);
      return response.data.notification;
    } catch (error) {
      console.log(error);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    unread: 0,
    isFetchingNotification: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        state.isFetchingNotification = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isFetchingNotification = false;
        state.notifications = action.payload;
        state.unread = action.payload.filter(
          (notification) => notification.read === false
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isFetchingNotification = true;
      });
  },
});

export default notificationSlice.reducer;
