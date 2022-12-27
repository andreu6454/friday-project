import { LinearProgress } from '@mui/material';
import { Navbar } from 'components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/store';

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
