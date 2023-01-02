import { AddAPhoto } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { BackLinkButton } from 'components';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { UploadFileWrapper } from 'components/UploadFileWrapper/UploadFileWrapper';
import { appRoutes } from 'routes';
import { logOutUser } from 'store/middleware/authUser';
import { changeUserAvatar, changeUserName } from 'store/middleware/user';
import { useAppDispatch, useAppSelector } from 'store/store';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const { user } = useAppSelector((state) => state.user);

  const logOutHandle = () => {
    dispatch(logOutUser());
  };

  const changeNameHandle = (name: string) => {
    dispatch(changeUserName({ name }));
  };

  const changeAvatarHandle = (base64Url: string) => {
    if (!base64Url) {
      return;
    }

    dispatch(
      changeUserAvatar({
        avatar: base64Url,
      }),
    );
  };

  if (status === 'loading') {
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
      <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton>
      <Card sx={{ width: '413px', m: '40px auto', py: 3 }}>
        <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
          Personal Information
        </Typography>

        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <UploadFileWrapper callback={changeAvatarHandle}>
                <IconButton component={'span'}>
                  <AddAPhoto
                    fontSize="medium"
                    sx={{
                      background: 'white',
                      border: '3px solid white',
                      borderRadius: '50%',
                    }}
                    // onClick={changePhotoHandle}
                  />
                </IconButton>
              </UploadFileWrapper>
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

export default ProfilePage;
