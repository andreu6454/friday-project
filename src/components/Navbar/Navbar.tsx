import AdbIcon from '@mui/icons-material/Adb';
import { LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { appRoutes } from '../../routes';
import { useAppSelector } from '../../store/store';

export const Navbar = () => {
  // const nav = useNavigate();
  const loading = useAppSelector((state) => state.auth.status);

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
    </>
  );
};
