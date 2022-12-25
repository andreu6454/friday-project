import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { AlertError } from '../../../components';
import { appRoutes } from '../../../routes';
import { setNewPassword } from '../../../store/middleware/authUser';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface IFormInput {
  password: string;
}
export const SetNewPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordChanged = useAppSelector((state) => state.auth.isPasswordChanged);
  const errorMsg = useAppSelector((state) => state.auth.error);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = ({ password }: IFormInput) => {
    const resetPasswordToken = location.pathname.slice(18);
    dispatch(setNewPassword({ password, resetPasswordToken }));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (isPasswordChanged) {
    nav(appRoutes.LOGIN);
  }
  return (
    <Box>
      <Card sx={{ width: 413, m: '40px auto', py: 3, pr: 2, pl: 2 }}>
        <CardContent>
          <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
            Create new password
          </Typography>
          <FormControl sx={{ mt: 10 }} variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'password required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error={!!errors.password}
            />
            <Box height="24px">
              {errors.password && (
                <Typography variant="body2" color="error">
                  {errors.password.message}
                </Typography>
              )}
            </Box>
          </FormControl>
          <Typography variant={'body2'} sx={{ opacity: 0.5 }}>
            Create new password and we will send you further instructions to email
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            sx={{ borderRadius: 30, bgcolor: '#366EFF', mt: 5 }}
            onClick={handleSubmit(onSubmit)}
          >
            Create new password
          </Button>
        </CardActions>
      </Card>
      <AlertError errorMsg={errorMsg} />
    </Box>
  );
};
