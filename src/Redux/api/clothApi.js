/* Adding endpoints */

import { baseApi } from "./baseApi";

const clothApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => ({
        url: "/all/product/get",
        method: "GET",
      }),
      providesTags: ["Product"], // cache for real time data get
    }),

    placeNewOrder: build.mutation({
      query: (newOrderInfo) => ({
        url: "/public/order/create",
        method: "POST",
        data: newOrderInfo,
        ContentType: "application/json",
      }),
      invalidatesTags: ["Product"], // Invalide data after placing an order
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProductsQuery, usePlaceNewOrderMutation } = clothApi;
