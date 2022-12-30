import { Box, CircularProgress, Container } from '@mui/material';
import React from 'react';

export const Preloader = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          mt: '10%',
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};
