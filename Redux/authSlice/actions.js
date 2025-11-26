import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../AxiosService";
import { logger } from "@/utility/logger.js";
import { USER_MANAGEMENT } from "@/Redux/constantUrls.js";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        `${USER_MANAGEMENT}/auth/register`,
        payload,
        { withCredentials: true }
      );

      return data;
    } catch (err) {
      logger.error("error occured in register user action :: ", err);
      rejectWithValue(err.response.data.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyMail",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(
        `${USER_MANAGEMENT}/auth/verify-email/${token}`
      );
      return data;
    } catch (err) {
      logger.error("error occured in verify email action :: ", err);
      rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
    } catch (err) {
      logger.error("Error occured in login user action ::", err);
      rejectWithValue(err.response.data.message);
    }
  }
);
