import PanoramaIcon from '@mui/icons-material/Panorama';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';

interface NoCoverImageProps {
  width?: string;
  height?: string;
}

export const NoCoverImage: FC<NoCoverImageProps> = ({
  width = '50px',
  height = '30px',
}) => {
  return (
    <Box
      sx={{
        width: `${width}`,
        height: `${height}`,
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
