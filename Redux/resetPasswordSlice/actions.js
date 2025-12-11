import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../AxiosService";
import { logger } from "@/utility/logger";
import { USER_MANAGEMENT } from "../constantUrls";

export const resetPasswordSendOTP = createAsyncThunk(
  "user/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        `${USER_MANAGEMENT}/auth/update-password/send-otp`,
        payload
      );
      return data;
    } catch (err) {
      logger.error("ERROR OCCURED IN RESET PASSWORD SENT OTP ACTION :: ", err);
      rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const resetPasswordVerifyOTP = createAsyncThunk(
  "user/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        `${USER_MANAGEMENT}/auth/update-password/verify-otp`,
        payload
      );
      return data;
    } catch (err) {
      logger.error("ERROR OCCURED IN RESET VERIFY OTP ACTION :: ", err);
      rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const resetUpdatePassword = createAsyncThunk(
  "user/forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.put(
        `${USER_MANAGEMENT}/auth/update-password/new-password`,
        payload
      );
      return data;
    } catch (err) {
      logger.error("ERROR OCCURED IN RESET UPDATE PASSWORD ACTION :: ", err);
      rejectWithValue(err?.response?.data?.message);
    }
  }
);
