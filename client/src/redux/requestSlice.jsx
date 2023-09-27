import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: true,
    isResponding: false,
  },
  reducers: {
    setData: (state, action) => {
      state.requests = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
export const { setData, setLoading, setError } = requestSlice.actions;
export default requestSlice.reducer;
