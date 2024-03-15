import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestOtp, SignUp, UpdateUser, User, VerifyOtp } from "./interface";
import api from "../../utils/auth/api";
import { handleAxiosError } from "../../utils/auth/errorHandler";
import { setUserTokenCookie } from "../../utils/auth/cookieUtility";




// Request OTP
export const requestOtp = createAsyncThunk(
    "auth/request_otp",
    async ({ method, email, recaptcha_token }: RequestOtp) => {
        try {
            const response = await api.post(`auth/request_otp/${method}`, { email, recaptcha_token });
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);


// Verify OTP and Login
export const verifyOtp = createAsyncThunk(
    "auth/login",
    async (payload: VerifyOtp) => {
        try {
            const response = await api.post(`auth/login`, payload);
            setUserTokenCookie(response.data.access_token);
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);


// Handle generate signup url
export const generateSignUpUrl = createAsyncThunk(
    "auth/sign_up/url",
    async () => {
        try {
            const response = await api.post(`auth/sign_up/url`);
            return response.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
);


// Handle submit generatedSignupUrl
export const submitGeneratedSignUpUrl = createAsyncThunk(
    "auth/user",
    async (payload:SignUp) => {
        try {
            const response = await api.post(`auth/user`, payload);
            setUserTokenCookie(response.data.access_token);
        } catch (error) {
            handleAxiosError(error);
        }
    }
);



// Get user details
export const getUserDetails = createAsyncThunk("auth/user/me", async () => {
    try {
      const response = await api.get("auth/user");
      const timeZones = response.data.timezone_dropdown_options.map((item:any)=>({
        value:item
      }))
      return {...response.data, timezone_dropdown_options:timeZones}
    } catch (error) {
      handleAxiosError(error);
    }
  });

  // Update user details
export const updateUserDetails = createAsyncThunk("auth/user/me/update", async (payload:UpdateUser) => {
    try {
      const response = await api.patch("auth/user", payload);
      const timeZones = response.data.timezone_dropdown_options.map((item:any)=>({
        value:item
      }))
      return {...response.data,timezone_dropdown_options:timeZones}
    } catch (error) {
      handleAxiosError(error);
    }
  });


  // get sync status
  export const accSyncStatus = createAsyncThunk("amazon/auth/refresh_token", async () => {
    try {
      const response = await api.get("amazon/auth/refresh_token");
      return response.data
    } catch (error) {
      handleAxiosError(error);
    }
  });
