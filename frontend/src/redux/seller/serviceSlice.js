import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  service:"hello",
  serviceId: null,
  scopes: [],
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

export const sellerServiceSlice = createSlice({
  name: "sellerServiceSlice",
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
    setSelectedScope: (state, actions) => {
      state.scopes = actions.payload;
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
    setServiceName: (state, actions) => {
      state.service = actions.payload;
    },
  },
});
export const {
  setAvailableDate,
  setSelectedScope,
  setSteps,
  setServiceId,
  setProviderService,
  setStepCount,
  setProfileStep,
  setServiceName
} = sellerServiceSlice.actions;
export default sellerServiceSlice.reducer;
