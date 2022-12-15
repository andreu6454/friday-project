import { AxiosResponse } from 'axios';

import { instance } from './../config';

export interface GetLoginType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ResponseLoginDataType {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
}

export const authAPI = {
  me() {
    //TODO:me point
  },
  forgot() {
    //TODO: forgot point
  },
  newPassword() {
    //TODO: newPassword point
  },
  login({ email, password, rememberMe }: GetLoginType) {
    return instance.post<ResponseLoginDataType>('/auth/login', {
      email,
      password,
      rememberMe,
    });
  },
};
