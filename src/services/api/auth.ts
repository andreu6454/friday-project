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
export interface ResponseForgotPasswordDataType {
  info: string;

  error?: string;
}
export interface GetForgotPasswordDataType {
  email: string;
  from: string;
  message: string;
}
export interface ResponseNewPassword {
  info: string;
  error?: string;
}
export interface GetSetNewPasswordDataType {
  password: string;
  resetPasswordToken: string;
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
  forgot({ email, from, message }: GetForgotPasswordDataType) {
    return instance.post<ResponseForgotPasswordDataType>('/auth/forgot', {
      email,
      from,
      message,
    });
  },
  newPassword({ password, resetPasswordToken }: GetSetNewPasswordDataType) {
    return instance.post<ResponseSetNewPasswordDataType>('/auth/set-new-password', {
      password,
      resetPasswordToken,
    });
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
