import { AxiosResponse } from "axios";
import { BaseResponse, EmailSign, User } from "models";
import api from "./api";

export const authService = {
    googleSignin: () => window.location.href = (import.meta.env.VITE_API_URL + "/auth/google") as any,
    facebookSignin: () => window.location.href = (import.meta.env.VITE_API_URL + "/auth/facebook") as any,
    emailSignin: (data: EmailSign): Promise<AxiosResponse<BaseResponse<User & { accesstoken: string; }>>> => api.post("/auth/signin", data),
    emailSignup: (data: EmailSign): Promise<AxiosResponse<BaseResponse<User & { accesstoken: string; }>>> => api.post("/auth/signup", data),
    logout: (): Promise<AxiosResponse<BaseResponse<any>>> => api.get("/auth/logout"),
    resendVerification: (): Promise<AxiosResponse<BaseResponse<boolean>>> => api.get("/auth/resend-verification"),
}