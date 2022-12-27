import { MarkEmailUnreadOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store/store';

const CheckEmailPage = () => {
  const nav = useNavigate();

  const email = useAppSelector((state) => state.auth.isForgotEmail);

  const handleNavigate = () => {
    nav(appRoutes.LOGIN);
  };
  return (
    <Box>
      <Card sx={{ width: 413, m: '40px auto', py: 3, pr: 2, pl: 2 }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
            Check Email
          </Typography>
          <MarkEmailUnreadOutlined sx={{ width: 108, height: 108, mt: 5 }} />
          <Typography variant={'body2'} sx={{ textAlign: 'center', opacity: 0.5 }}>
            We’ve sent an Email with instructions to {email ? email : 'your email'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            sx={{ borderRadius: 30, bgcolor: '#366EFF', mt: 5 }}
            onClick={handleNavigate}
          >
            Back to login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CheckEmailPage;
