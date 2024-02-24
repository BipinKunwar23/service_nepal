import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  serviceId: null,
  stepCount:1,
  steps: [
    { id: 1, title: "Job Overview", show: true },
    { id: 2, title: "Pricing and Scopes", show: false },
    { id: 3, title: "Description and FAQ", show: false },
    { id: 4, title: "Gallery", show: false },
    { id: 5, title: "Requirements", show: false },
  ],
  profileSteps:"personal"
};

export const sellerSlice = createSlice({
  name: "sellerSlice",
  initialState,
  available_date: new Date(),
  reducers: {
    setServiceId: (state, actions) => {
      state.serviceId = actions.payload;
    },
    setProviderService: (state, actions) => {
        state.serviceId = actions.payload;
      },
    setAvailableDate: (state, actions) => {
      state.available_date = actions.payload;
    },
 
    setSteps: (state, actions) => {
      state.steps = actions.payload;
    },
    setStepCount: (state, actions) => {
      state.stepCount = actions.payload;
    },
    setProfileStep: (state, actions) => {
      state.profileSteps = actions.payload;
    },
  
  },
});
export const {
  setAvailableDate,
  setSteps,
  setServiceId,
  setProviderService,
  setStepCount,
  setProfileStep,
} = sellerSlice.actions;
export default sellerSlice.reducer;
