import { createSlice } from "@reduxjs/toolkit";

const dtoLoadingSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    isDtoLoading: false,
  },
  reducers: {
    setDtoLoading: (state, action) => {
      state.isDtoLoading = action.payload;
    },

  }
});
export const { setDtoLoading } = dtoLoadingSlice.actions;
export default dtoLoadingSlice.reducer;
