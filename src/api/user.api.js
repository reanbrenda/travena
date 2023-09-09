import { getCookie } from "../utils/cookies";
import axiosClient from '../axios/AxiosClient';
import { userEndpoints } from './user.endpoints';


export const loginUser = async (loginData) => {
    const results = await axiosClient.post(userEndpoints.login, loginData);
    return results?.data
}

export const signUpUser = async (signUpData) => {
    const results = await axiosClient.post(userEndpoints.signUP, signUpData)
    return results?.data
}

export const verifyEmail = async (verifyEmailData) => {
    const results = await axiosClient.post(userEndpoints.verifyEmail, verifyEmailData)
    return results?.data
}


export const forgetPassword = async (fPasswordData) => {
    const results = await axiosClient.post(userEndpoints.forgetPassword, fPasswordData)
    return results?.data
}


export const resetPassword = async (resetPassData) => {
    const results = await axiosClient.post(userEndpoints.resetPassword, resetPassData)
    return results?.data
}


export const getUserProfile = async () => {
    const {userId} = getCookie("UserInfo")
    const results = await axiosClient.get(userEndpoints.getProfile(userId))
    return results?.data
}