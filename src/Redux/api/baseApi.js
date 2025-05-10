/* eslint-disable no-empty-pattern */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "clothingBrandApi", // api name here

  baseQuery: axiosBaseQuery({ baseUrl: "https://admin.refabry.com/api" }),

  endpoints: () => ({}),
});

export const {} = baseApi;
