/* All authentication related work here so name authApi */
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDynamicUser: build.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        data: userInfo,
        ContentType: "application/json",
      }),
    }),
    loginDynamicUser: build.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        data: userInfo,
        ContentType: "application/json",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateDynamicUserMutation, useLoginDynamicUserMutation } =
  authApi;
