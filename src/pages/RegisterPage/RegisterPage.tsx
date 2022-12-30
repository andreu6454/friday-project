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
  Link,
  TextField,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AlertError } from 'components';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { registerUser } from 'store/middleware/authUser';
import { useAppDispatch, useAppSelector } from 'store/store';

interface IFormInput {
  email: string;
  password: string;
  confirmedPassword: string;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error, isRegistered } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: 'vasya@gmail.com',
      password: '213123321',
      confirmedPassword: '213123321',
    },
  });
  const password = useRef({});
  password.current = watch('password', '');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }: IFormInput) => {
    dispatch(registerUser({ email, password }));
  };
  const handleNavigate = () => {
    nav(appRoutes.DEFAULT);
  };
  if (isRegistered) {
    return <Navigate to={appRoutes.DEFAULT} />;
  }
  return (
    <Box>
      <Card sx={{ width: 413, m: '40px auto', py: 3 }}>
        <CardContent>
          <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
            Sign Up
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', px: 1 }}>
            <FormControl sx={{ m: 1 }} variant="standard">
              <TextField
                id="outlined-helperText"
                label="Email"
                variant="standard"
                {...register('email', { required: 'Email Address is required' })}
                error={!!errors.email}
              />
              <Box height="24px">
                {errors.email && (
                  <Typography variant="body2" color="error">
                    {errors.email.message}
                  </Typography>
                )}
              </Box>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
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
                error={!!errors.confirmedPassword || !!errors.password}
              />
              <Box height="24px">
                {errors.password && (
                  <Typography variant="body2" color="error">
                    {errors.password.message}
                  </Typography>
                )}
              </Box>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirm password
              </InputLabel>
              <Input
                id="register-confirm-password"
                type={showPassword ? 'text' : 'password'}
                {...register('confirmedPassword', {
                  required: true,
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
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
                error={!!errors.confirmedPassword}
              />
              <Box height="24px">
                {errors.confirmedPassword && (
                  <Typography variant="body2" color="error">
                    {errors.confirmedPassword.message}
                  </Typography>
                )}
              </Box>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', flexDirection: 'column', gap: '31px', px: 3 }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ borderRadius: 30, bgcolor: '#366EFF', mt: 5 }}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant={'body1'} sx={{ opacity: 0.5 }}>
              Already have an account?
            </Typography>
            <Link fontWeight={'bold'} onClick={handleNavigate}>
              Sign In
            </Link>
          </Box>
        </CardActions>
      </Card>
      <AlertError errorMsg={error} />
    </Box>
  );
};

export default RegisterPage;
