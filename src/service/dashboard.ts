import { AxiosResponse } from "axios";
import { BaseResponse, User } from "models";
import api from "./api";

export const dashboardService = {
    countSignup: (): Promise<AxiosResponse<BaseResponse<number>>> => api.get("/dashboard/count-signup"),
    countActiveToday: (): Promise<AxiosResponse<BaseResponse<number>>> => api.get("/dashboard/count-active-today"),
    countAvgActiveIn7Day: (): Promise<AxiosResponse<BaseResponse<number>>> => api.get("/dashboard/count-average-7-day"),
    listUser: (): Promise<AxiosResponse<BaseResponse<User[]>>> => api.get("/dashboard/list-user"),
}