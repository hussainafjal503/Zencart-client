import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../AxiosService";
import { logger } from "@/utility/logger";

export const resetPasswordSendOTP=createAsyncThunk("user/forgetPassword",async(payload,{rejectWithValue})=>{
	try{
			const{data}=await axiosClient.post(payload,{withCredentials:true});
			return data;
	}catch(err){
		logger.error("ERROR OCCURED IN RESET PASSWORD SENT OTP ACTION :: ",err);
		rejectWithValue(err?.response?.data?.message);
	}
});


export const resetVerifyOTP=createAsyncThunk("user/forgetPassword",async(payload,{rejectWithValue})=>{
	try{
		const {data}=await axiosClient.post("",payload,{withCredentials:true});
		return data;

	}catch(err){
		logger.error("ERROR OCCURED IN RESET VERIFY OTP ACTION :: ",err);
		rejectWithValue(err?.response?.data?.message);
	}
})

export const resetUpdatePassword=createAsyncThunk("user/forgetPassword",async(payload,{rejectWithValue})=>{
	try{
			const {data}=await axiosClient.post("",payload,{withCredentials:true});
			return  data;
	}catch(err){
		logger.error("ERROR OCCURED IN RESET UPDATE PASSWORD ACTION :: ",err);
		rejectWithValue(err?.response?.data?.message)
	}
})