import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [], email: "" };

export const dynamicSlice = createSlice({
  name: "dynamicUser",
  initialState,
  reducers: {
    // Lots of slice here ...
    countProduct: (state, action) => {
      state.value = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { countProduct, setEmail } = dynamicSlice.actions;

export default dynamicSlice.reducer;
