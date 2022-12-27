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
import { AlertError } from 'components';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { Preloader } from 'sections/login-page/Preloader';
import { loginUser } from 'store/middleware/authUser';
import { useAppDispatch, useAppSelector } from 'store/store';

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const errorMsg = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.status);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      email: 'vasya@gmail.com',
      password: '213123321',
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

  const handleForgotNavigate = () => {
    nav(appRoutes.FORGOT);
  };
  const pendingStatus = loading === 'loading';

  if (isAuth) {
    return <Navigate to={appRoutes.PACKS} />;
  }

  if (pendingStatus) {
    return <Preloader />;
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

          <Link
            onClick={handleForgotNavigate}
            color={'#000000'}
            sx={{ textAlign: 'right' }}
            component="button"
            variant="body2"
            underline="none"
          >
            Forgot Password?
          </Link>
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
              <Typography
                fontWeight="bold"
                color={'#000000'}
                sx={{ opacity: '0.5' }}
                variant="body2"
              >
                Already have an account?
              </Typography>

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
