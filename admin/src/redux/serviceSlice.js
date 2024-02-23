import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  service: "",

};

export const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {
    setProviderService: (state, actions) => {
      state.service = actions.payload;
    },
  
  },
});
export const { setProviderService } = serviceSlice.actions;
export default serviceSlice.reducer;
