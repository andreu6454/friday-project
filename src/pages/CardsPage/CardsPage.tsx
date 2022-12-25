import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

export const CardsPage = () => {
  return (
    <Box marginTop={3}>
      <Button variant="contained">Back to PackList </Button>
      <Box display="flex" flexDirection="column" alignItems="center" marginY={3}>
        <Typography variant="h5" alignSelf="flex-start" textAlign="left">
          Name Pack
        </Typography>
        <Stack alignItems="center" gap={3} marginTop={10}>
          <Typography variant="body2">
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button variant="contained">Add new card</Button>
        </Stack>
      </Box>
    </Box>
  );
};
