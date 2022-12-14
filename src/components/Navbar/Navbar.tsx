import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes/routes';

export const Navbar = () => {
  const nav = useNavigate();

  const { isAuth } = useAuth();

  const handleNavigate = () => {
    nav(appRoutes.DEFAULT);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={handleNavigate}
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
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
      </Toolbar>
    </AppBar>
  );
};
