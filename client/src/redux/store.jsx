import { configureStore } from "@reduxjs/toolkit";
import requestSlice from "./requestSlice";
import notificationSlice from "./notificationSlice";
import readNotificationSlice from "./readNotificationSlice";
import dtoLoadingSlice from "./dtoLoadingSlice";

export default configureStore({
  reducer: {
    requests: requestSlice,
    notifications: notificationSlice,
    readNotification: readNotificationSlice,
    dtoLoading: dtoLoadingSlice,
  },
});
