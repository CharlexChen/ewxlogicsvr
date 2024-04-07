import api, { HttpResponse } from './base';
export interface LoginReq {
    username: string;
    password: string;
}
export interface LoginRes {
    token: string;
}
export const login = (data: LoginReq) => api.post<null, HttpResponse<LoginRes>>('/common/login', data);

export interface UserInfoRes {
    username: string;
    avatar: string;
    age: number;
    country: string;
};
export const getUserInfo = () => api.get<null, HttpResponse<UserInfoRes>>('/common/getUserInfo');