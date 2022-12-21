import AdbIcon from '@mui/icons-material/Adb';
import { Avatar, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes';
import { useAppSelector } from '../../store/store';

export const Navbar = () => {
  // const nav = useNavigate();
  const loading = useAppSelector((state) => state.auth.status);
  const name = useAppSelector((state) => state.user.user.name);
  const avatar = useAppSelector((state) => state.user.user.avatar);
  const { isAuth } = useAuth();

  // const handleNavigate = () => {
  //   nav(appRoutes.LOGIN);
  // };

  const pendingStatus = loading === 'loading';

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Learn cards
          </Typography>
          {isAuth ? (
            <Link
              to={appRoutes.PROFILE}
              style={{
                color: 'black',
                textDecoration: 'none',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography variant={'body1'} color={'white'} fontWeight={'bold'}>
                {name}
              </Typography>
              <Avatar alt="avatar" src={avatar} sx={{ ml: 1 }} />
            </Link>
          ) : (
            <Button
              variant={'contained'}
              color={'inherit'}
              sx={{ bgcolor: 'white', color: 'black', borderRadius: '30px' }}
              onClick={() => nav(appRoutes.DEFAULT)}
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
