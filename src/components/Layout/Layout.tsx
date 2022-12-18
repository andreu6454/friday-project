import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../Navbar/Navbar';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
