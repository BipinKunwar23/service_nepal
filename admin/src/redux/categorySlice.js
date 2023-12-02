import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  category: null,
  subcategory: null,

  serviceId: null,
  subCatgButton: "",
  action: "",
  edit: "",
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },

    setPath: (state, action) => {
      state.path = action.payload;
    },
    setCategoryAciton: (state, action) => {
      state.action = action.payload;
    },
    setSubCatgButton: (state, action) => {
      state.subCatgButton = action.payload;
    },

    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setEditAction: (state, actons) => {
      state.edit = actons.payload;
    },
  },
});
export const {
  setCategory,
  setSubcategory,
  setSelectedCategory,
  setPath,
  setCategoryAciton,
  setSubCatgButton,
  setEditAction
} = categorySlice.actions;
export default categorySlice.reducer;
