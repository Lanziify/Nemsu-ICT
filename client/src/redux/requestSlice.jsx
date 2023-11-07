import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    fetchingRequests: true,
    isResponding: false,
  },
  reducers: {
    setData: (state, action) => {
      state.requests = action.payload;
      state.fetchingRequests = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.fetchingRequests = action.payload;
    },
    setError: (state, action) => {
      state.fetchingRequests = false;
      state.error = action.payload;
    },
  }
});
export const { setData, setLoading, setError } = requestSlice.actions;
export default requestSlice.reducer;
