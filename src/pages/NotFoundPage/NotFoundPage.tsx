import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';

import error404 from './404.svg';
export const NotFoundPage = () => {
  const nav = useNavigate();
  const navigateHandle = () => {
    nav(appRoutes.DEFAULT);
  };
  return (
    <Box
      display={'flex'}
      m={'auto'}
      mt={20}
      alignItems={'center'}
      width={'max-content'}
      boxSizing={'border-box'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        mr={8}
        pb={5}
      >
        <Typography
          fontWeight={600}
          fontSize={'50px'}
          fontFamily={'Montserrat'}
          textAlign={'center'}
        >
          Ooops!
        </Typography>
        <Typography variant={'body1'} textAlign={'center'}>
          Sorry! Page not found!
        </Typography>
        <Button
          onClick={navigateHandle}
          variant="contained"
          sx={{ mt: '60px', borderRadius: '30px' }}
        >
          Back to home page
        </Button>
      </Box>
      <Box>
        <img src={error404} alt={'404'} />
      </Box>
    </Box>
  );
};
