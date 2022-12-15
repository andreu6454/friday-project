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
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes/routes';

export const Register = () => {
  const { isAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleNavigate = () => {
    nav(appRoutes.DEFAULT);
  };
  return isAuth ? (
    <Navigate to={appRoutes.PROFILE} />
  ) : (
    <div>
      <Card sx={{ width: 413, m: '40px auto', py: 3 }}>
        <CardContent>
          <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
            Sign Up
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', px: 1 }}>
            <FormControl sx={{ m: 1 }} variant="standard">
              <TextField id="outlined-helperText" label="Email" variant="standard" />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="register-password"
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
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirm password
              </InputLabel>
              <Input
                id="register-confirm-password"
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
        </CardContent>
        <CardActions
          sx={{ display: 'flex', flexDirection: 'column', gap: '31px', px: 3 }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ borderRadius: 30, bgcolor: '#366EFF', mt: 5 }}
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
    </div>
  );
};
