/* eslint-disable no-unused-vars */
import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, ContentType }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,  
        data,
        params,
        headers: {
          "Content-Type": ContentType || "application/json",
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
