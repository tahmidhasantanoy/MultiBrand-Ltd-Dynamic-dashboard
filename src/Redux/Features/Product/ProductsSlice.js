import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const productSlice = createSlice({
  name: "clothingBrand",
  initialState,
  reducers: {

    // Lots of slice here ...
    countProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { countProduct } = productSlice.actions;

export default productSlice.reducer;
