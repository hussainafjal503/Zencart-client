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
      );

      return data;
    } catch (err) {
      logger.error("error occured in register user action :: ", err);
      return rejectWithValue(err?.response?.data?.message);
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
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        `${USER_MANAGEMENT}/auth/login`,
        payload,
      );
      return data;
    } catch (err) {
      logger.error("Error occured in login user action ::", err);
      return rejectWithValue(
        err?.response?.data?.message || "something went wrong"
      );
    }
  }
);

export const validateOTP = createAsyncThunk(
  "auth/validateOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        `${USER_MANAGEMENT}/auth/validateOTP`,
        payload,
       
      );
      return data;
    } catch (err) {
      logger.error("ERROR OCCURED IN VALIDATE OTP ACTIONS :: ", err);
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        `${USER_MANAGEMENT}/auth/resendOTP`,
        payload,
      );
      return data;
    } catch (err) {
      logger.error("ERROR OCCURED IN RESEND OTP ACTIONS ::", err);
      rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get();
      return data;
    } catch (err) {
      logger.error("ERROR OCCURED IN LOGOUT ACTION : ", err);
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
