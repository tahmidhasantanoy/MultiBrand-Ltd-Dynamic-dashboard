/* eslint-disable no-empty-pattern */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "dynamicUserApi", // api name here

  // baseQuery: axiosBaseQuery({ baseUrl: "https://admin.refabry.com/api" }),
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),

  endpoints: () => ({}),
});

export const {} = baseApi;
