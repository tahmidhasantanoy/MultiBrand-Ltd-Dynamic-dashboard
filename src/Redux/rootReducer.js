import { baseApi } from "./api/baseApi";
import productReducer from "./Features/Product/ProductsSlice";

export const rootReducer = {
  cloth: productReducer, // name: "clothingBrand",
  [baseApi.reducerPath]: baseApi.reducer,
};
