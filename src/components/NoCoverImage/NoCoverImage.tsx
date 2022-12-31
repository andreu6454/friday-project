import PanoramaIcon from '@mui/icons-material/Panorama';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

export const NoCoverImage = () => {
  return (
    <Box
      sx={{
        width: '50px',
        height: '30px',
        alignItems: 'center',
        backgroundColor: grey[200],
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <PanoramaIcon sx={{ opacity: '0.2' }} />
    </Box>
  );
};
