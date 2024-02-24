import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: "hello",
  scopes: [],
  subcategories: [],


  category: {},
  subcategory: {},
  serviceId: null,
  providerId: null,
  searchProvider: null,
  service: null,
  filters: {
    category: null,
    subcategory: null,
    location: null,
    price: null,
    rating: null,
  },
  status: 0,
  available_date: 0,
};

export const buyerSlice = createSlice({
  name: "buyerSlice",
  initialState,
  reducers: {
    setCategory: (state, actions) => {
      state.category = actions.payload;
    },
    setSubCategory: (state, actions) => {
      state.subcategory = actions.payload;
    },
    setServiceId: (state, actions) => {
      state.serviceId = actions.payload;
    },
    setProviderId: (state, actions) => {
      state.providerId = actions.payload;
    },
    setSearchingProvider: (state, actions) => {
      state.searchProvider = actions.payload;
    },
    setService: (state, actions) => {
      state.service = actions.payload;
    },
    setFilterAction: (state, actions) => {
      state.filters = actions.payload;
    },
    setSubCategories: (state, actions) => {
      state.subcategories = actions.payload;
    },
    setStatus: (state, actions) => {
      state.subcategories = actions.payload;
    },
    setAvailableDate: (state, actions) => {
      state.available_date = actions.payload;
    },
    setServiceName: (state, actions) => {
      state.service = actions.payload;
    },

    setSelectedScope: (state, actions) => {
        state.scopes = actions.payload;
      },
  },
});
export const {
  setCategory,
  setSubCategory,
  setServiceId,
  setProviderId,
  setSearchingProvider,
  setService,
  setFilterAction,
  setSubCategories,
  setStatus,
  setAvailableDate,
  setServiceName,
  setSelectedScope
} = buyerSlice.actions;
export default buyerSlice.reducer;
