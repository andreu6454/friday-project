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
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes/routes';

export const Login = () => {
  const { isAuth } = useAuth();

  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  if (isAuth) {
    return <Navigate to={appRoutes.PROFILE} />;
  }

  const handleNavigate = () => {
    nav(appRoutes.REGISTER);
  };

  return (
    <Card sx={{ width: '413px', m: '40px auto' }}>
      <CardContent>
        <Typography fontWeight="bold" variant="h5" textAlign={'center'}>
          Sign In
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', px: 1 }}>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
            <Input type={'text'} />
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
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
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
          <Checkbox defaultChecked />
          <Typography>Remember me</Typography>
        </Box>
        <Typography textAlign={'right'}>Forgot Password?</Typography>
        <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: '31px' }}>
          <Button fullWidth variant="contained" sx={{ mt: '60px' }}>
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
      </CardContent>
    </Card>
  );
};
