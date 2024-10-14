import { AxiosResponse } from "axios";
import { BaseResponse, PasswordReset, User } from "models";
import api from "./api";

export const userService = {
    profile: (): Promise<AxiosResponse<BaseResponse<User>>> => api.get("/user/profile"),
    profileUpdate: (data: Partial<User>): Promise<AxiosResponse<BaseResponse<User>>> => api.patch("/user/profile", data),
    passwordUpdate: (data: PasswordReset): Promise<AxiosResponse<BaseResponse<string>>> => api.patch("/user/password-update", data),
}