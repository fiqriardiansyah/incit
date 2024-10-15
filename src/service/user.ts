import { AxiosResponse } from "axios";
import { BaseResponse, PasswordReset, PasswordSet, User } from "models";
import api from "./api";

export const userService = {
    profile: (): Promise<AxiosResponse<BaseResponse<User>>> => api.get("/user/profile"),
    profileUpdate: (data: Partial<User>): Promise<AxiosResponse<BaseResponse<User>>> => api.patch("/user/profile", data),
    passwordUpdate: (data: PasswordReset): Promise<AxiosResponse<BaseResponse<string>>> => api.patch("/user/password-update", data),
    passwordSet: (data: PasswordSet): Promise<AxiosResponse<BaseResponse<string>>> => api.patch("/user/password-set", data),
    isPasswordSet: (): Promise<AxiosResponse<BaseResponse<boolean>>> => api.get("/user/is-password-set"),
}