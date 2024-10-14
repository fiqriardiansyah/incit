import axios from "axios";
import cookie from 'js-cookie';
import { BaseResponse } from "models";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": true,
        "Authorization": cookie.get("token"),
    },
    withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
        return {
            ...config,
        };
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const baseResponse = error?.response?.data as BaseResponse<any>;
        return Promise.reject(baseResponse?.error ? Error(baseResponse?.error) : error)
    }
);

export default api;
