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

export interface ResponseLogOutDataType {
  info: string;
  error?: string;
}
export interface ResponseUpdateUserDataType {
  updatedUser: ResponseLoginDataType;
  error?: string;
}
export const authAPI = {
  me() {
    return instance.post<ResponseLoginDataType>('/auth/me', {});
  },
  logOut() {
    return instance.delete<ResponseLogOutDataType>('/auth/me', {});
  },
  updateUser(name = '', avatar = '') {
    return instance.put<ResponseUpdateUserDataType>('/auth/me', { name, avatar });
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
