import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  verifyEmail,
  loginUser,
  validateOTP,
  resendOTP,
} from "./actions.js";

const initialState = {
  userData: null,
  isLoading: false,
  error: null,
  message: null,
  isAuth: false,
  otpValidated: false,
  resendLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.message = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // verify mail

      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.isAuth = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //validate otp

    builder
      .addCase(validateOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.isAuth = true;
        state.otpValidated = true;
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //resend otp
    builder
      .addCase(resendOTP.pending, (state) => {
        state.resendLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.resendLoading = false;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.resendLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
