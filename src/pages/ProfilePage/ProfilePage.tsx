import { AddAPhoto, ArrowBack } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { EditableSpan } from '../../components/EditableSpan/EditableSpan';
import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes';
import { logOutUser } from '../../store/middleware/authUser';
import {
  changeUserAvatar,
  changeUserName,
  getUserData,
} from '../../store/middleware/user';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const ProfilePage = () => {
  const { isAuth, loading } = useAuth();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const logOutHandle = () => dispatch(logOutUser());

  const changeNameHandle = (name: string) => {
    dispatch(changeUserName({ name }));
  };
  const changePhotoHandle = () => {
    const avatar =
      'https://abrakadabra.fun/uploads/posts/2022-03/1647337144_2-abrakadabra-fun-p-avatarka-dlya-estetiki-6.png';
    dispatch(
      changeUserAvatar({
        avatar,
      }),
    );
  };
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
    <Box mt={2}>
      <Link
        to={appRoutes.CARDPACKS}
        style={{
          gap: '8px',
          color: 'black',
          textDecoration: 'none',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <ArrowBack />
        <Typography variant={'body1'}>Back To Pack List</Typography>
      </Link>
      <Card sx={{ width: '413px', m: '40px auto', py: 3 }}>
        <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
          Personal Information
        </Typography>

        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <AddAPhoto
                fontSize="medium"
                sx={{
                  background: 'white',
                  border: '3px solid white',
                  borderRadius: '50%',
                }}
                onClick={changePhotoHandle}
              />
            }
          >
            <Avatar
              alt="avatar"
              src={user.avatar}
              sx={{ width: 96, height: 96, mt: 4 }}
            />
          </Badge>

          <EditableSpan key={user._id} Nickname={user.name} callBack={changeNameHandle} />

          <Typography variant={'body1'} textAlign={'center'} mt={2} sx={{ opacity: 0.7 }}>
            {user.email}
          </Typography>

          <Button
            variant={'contained'}
            color={'inherit'}
            sx={{ mt: 3, bgcolor: 'white', color: 'black', borderRadius: '30px' }}
            onClick={logOutHandle}
          >
            Log out
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
