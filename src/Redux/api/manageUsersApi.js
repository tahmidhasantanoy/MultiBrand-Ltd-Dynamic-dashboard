/* Adding endpoints */

import { baseApi } from "./baseApi";

const manageUsersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersInfo: build.query({
      query: () => ({
        url: "/get-users-info",
        method: "GET",
      }),
      providesTags: ["multibrand"], // cache for real time data get
    }),

    createNewUserInfo: build.mutation({
      query: (newUserInfo) => ({
        url: "/add-user-info",
        method: "POST",
        data: newUserInfo,
        ContentType: "application/json",
      }),
      invalidatesTags: ["multibrand"], // Invalide data after placing an order
    }),

    updateUserInfo: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update-user-info/${id}`,
        method: "PUT",
        data: updatedData,
        ContentType: "application/json",
      }),
      invalidatesTags: ["multibrand"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersInfoQuery,
  useCreateNewUserInfoMutation,
  useUpdateUserInfoMutation,
} = manageUsersApi;
