import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInput: "",
  activeCategoryId: null,
  activeRatingId: null,
  activeOptionId: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveOptionId: (state, action) => {
    state.activeOptionId = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setCategory: (state, action) => {
      state.activeCategoryId = action.payload;
    },
    setRating: (state, action) => {
      state.activeRatingId = action.payload;
    },
    clearFilters: (state) => {
      state.searchInput = "";
      state.activeCategoryId = null;
      state.activeRatingId = null;
    },
  },
});

export const { setSearchInput, setCategory, setRating, clearFilters,setActiveOptionId } = filterSlice.actions;

export default filterSlice.reducer;