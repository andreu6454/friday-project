import { instance } from 'services/config';
import {
  GetForgotPasswordDataType,
  GetLoginType,
  getRegisterType,
  GetSetNewPasswordDataType,
  ResponseLoginDataType,
  ResponseLogOutDataType,
  ResponseNewPassword,
  ResponseRegisterDataType,
  ResponseUpdateUserDataType,
} from 'services/type';

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
    return instance.post<ResponseNewPassword>('/auth/forgot', {
      email,
      from,
      message,
    });
  },
  newPassword({ password, resetPasswordToken }: GetSetNewPasswordDataType) {
    return instance.post<ResponseNewPassword>('/auth/set-new-password', {
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
