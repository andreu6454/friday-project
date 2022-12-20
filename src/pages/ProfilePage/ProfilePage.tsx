import { ArrowBack, BorderColorOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes';
import { logOutUser } from '../../store/middleware/authUser';
import { getUserData } from '../../store/middleware/user';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const ProfilePage = () => {
  const { isAuth, loading } = useAuth();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const logOutHandle = () => dispatch(logOutUser());

  useEffect(() => {
    if (!user.email) {
      dispatch(getUserData());
    }
  }, []);

  if (!isAuth) {
    return <Navigate to={appRoutes.DEFAULT} />;
  }

  const pendingStatus = loading === 'loading';

  if (pendingStatus) {
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
  }
  return (
    <Box>
      <Box display={'flex'} mt={2}>
        <ArrowBack />
        <Link to={appRoutes.CARDPACKS} style={{ color: 'black', textDecoration: 'none' }}>
          Back To Pack List
        </Link>
      </Box>
      <Card sx={{ width: '413px', m: '40px auto', py: 3 }}>
        <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
          Personal Information
        </Typography>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Avatar alt="avatar" src={user.avatar} sx={{ width: 96, height: 96, mt: 4 }} />
          <Typography variant={'h6'} fontWeight={'Bold'} textAlign={'center'} mt={2}>
            {user.name}
            <BorderColorOutlined
              sx={{ opacity: 0.5, ml: 0.5 }}
              fontSize={'small'}
            ></BorderColorOutlined>
          </Typography>
          <Typography variant={'body1'} textAlign={'center'} m={1} sx={{ opacity: 0.7 }}>
            {user.email}
          </Typography>
          <Button
            variant={'contained'}
            color={'inherit'}
            sx={{ mt: 2, bgcolor: 'white', color: 'black', borderRadius: '30px' }}
            onClick={logOutHandle}
          >
            Log out
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
