import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AlertError } from '../../components';
import { loginUser } from '../../features/auth/middleware/authUser';
import { useAuth } from '../../hooks';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { appRoutes } from '../../routes/routes';

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const errorMsg = useAppSelector((state) => state.auth.error);
  const nav = useNavigate();
  const { isAuth } = useAuth();

  const { register, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      email: 'vasya@gmail.com',
      password: '213123',
      rememberMe: true,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = ({
    email,
    password,
    rememberMe,
  }: IFormInput) => dispatch(loginUser({ email, password, rememberMe }));

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleNavigate = () => {
    nav(appRoutes.REGISTER);
  };

  if (isAuth) {
    nav(appRoutes.PROFILE);
  }

  return (
    <Card sx={{ width: '413px', m: '40px auto' }}>
      <CardContent sx={{ padding: 3 }}>
        <Typography fontWeight="bold" variant="h5" textAlign={'center'}>
          Sign In
        </Typography>

        <FormGroup>
          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input {...register('email', { required: true })} type={'text'} />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              fullWidth
              {...register('password', { required: true })}
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                {...register('rememberMe')}
                checked={watch('rememberMe')}
                name="remember-me"
              />
            }
            label="Remember me"
          />

          <Typography sx={{ cursor: 'pointer' }} textAlign={'right'}>
            Forgot Password?
          </Typography>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: '31px' }}>
            <Button
              onClick={handleSubmit(onSubmit)}
              fullWidth
              variant="contained"
              sx={{ mt: '60px' }}
            >
              Sign In
            </Button>
            <Box display="flex" gap="7px" flexDirection="column" alignItems="center">
              <Link
                fontWeight="bold"
                color={'#000000'}
                sx={{ opacity: '0.5' }}
                component="button"
                variant="body2"
                underline="none"
              >
                Already have an account?
              </Link>

              <Link
                onClick={handleNavigate}
                component="button"
                variant="body1"
                fontWeight="bold"
              >
                Sign Up
              </Link>
            </Box>
          </CardActions>
        </FormGroup>
      </CardContent>
      <AlertError errorMsg={errorMsg} />
    </Card>
  );
};
