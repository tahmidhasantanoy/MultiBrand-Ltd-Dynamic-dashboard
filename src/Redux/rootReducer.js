import { baseApi } from "./api/baseApi";
import userReducer from "./Features/Product/ProductsSlice";

export const rootReducer = {
  cloth: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
