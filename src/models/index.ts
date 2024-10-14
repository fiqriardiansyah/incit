export interface BaseResponse<T = any> {
    data: T;
    error: any;
}

export interface EmailSign {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
    logoutat: Date;
    countlogin: number;
    createdat: Date;
    verified?: boolean;
}

export interface PasswordReset {
    password: string;
    newpassword: string;
}