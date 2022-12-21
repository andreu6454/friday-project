import { LinearProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store/store';
import { Navbar } from '../Navbar/Navbar';

export const Layout = () => {
  const loading = useAppSelector((state) => state.auth.status);

  if (loading === 'loading') {
    return (
      <>
        <Navbar />
        <LinearProgress />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
