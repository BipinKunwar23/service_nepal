import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: "hello",
  scopes: [],
  subcategories: [],

  category:null,
  subcategory: null,
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
  paginateUrl: 1,
  chat:false,
  continue:false,
  review:false,

  users:[],
  quote:false

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
    setPaginateUrl: (state, actions) => {
      state.paginateUrl = actions.payload;
    },
    setChat: (state, actions) => {
      state.chat = actions.payload;
    },
    setContinue: (state, actions) => {
      state.continue = actions.payload;
    },
    createReview: (state, actions) => {
      state.review = actions.payload;
    },
    setQuote: (state, actions) => {
      state.quote = actions.payload;
    },
    leavedUsers: (state, actions) => {
      state.leaved = actions.payload;
    },
    setUsers: (state, actions) => {
      state.users = actions.payload;
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
  setSelectedScope,
  setPaginateUrl,
  setChat,
  setContinue,
  createReview,
  setUsers,
  setQuote
} = buyerSlice.actions;
export default buyerSlice.reducer;
