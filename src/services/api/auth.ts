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

export interface ResponseRegisterDataType {
  addedUser: object;
  error?: string;
}

export interface getRegisterType {
  email: string;
  password: string;
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
  register({ email, password }: getRegisterType) {
    return instance.post<ResponseRegisterDataType>('/auth/register', { email, password });
  },
};
