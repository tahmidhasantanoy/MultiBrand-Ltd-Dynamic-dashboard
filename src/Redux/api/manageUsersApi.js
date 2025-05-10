/* Adding endpoints */

import { baseApi } from "./baseApi";

const manageUsersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersInfo: build.query({
      query: () => ({
        url: "/get-users-info",
        method: "GET",
      }),
      providesTags: ["Product"], // cache for real time data get
    }),

    createNewUserInfo: build.mutation({
      query: (newUserInfo) => ({
        url: "/add-user-info", // modify
        method: "POST",
        data: newUserInfo,
        ContentType: "application/json",
      }),
      invalidatesTags: ["Product"], // Invalide data after placing an order
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersInfoQuery, useCreateNewUserInfoMutation } = manageUsersApi;
