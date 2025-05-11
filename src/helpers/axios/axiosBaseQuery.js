/* eslint-disable no-unused-vars */
import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, ContentType }) => {
    try {
      const token = localStorage.getItem("accessToken");
      // console.log(token);

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": ContentType || "application/json",
          ...headers,
        },
      });
      return { data: result.data }; // modify accordingly
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
