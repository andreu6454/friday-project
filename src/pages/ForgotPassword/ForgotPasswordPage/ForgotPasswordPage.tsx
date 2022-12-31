import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AlertError } from 'components';
import { useActions } from 'hooks';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { authAsyncActions } from 'store/middleware/authUser';
import { authActions } from 'store/slices';
import { useAppSelector } from 'store/store';

const ForgotPasswordPage = () => {
  const nav = useNavigate();
  const { forgotPassword } = useActions(authAsyncActions);
  const { setErrorMsg } = useActions(authActions);

  const isForgot = useAppSelector((state) => state.auth.isForgotEmail);
  const errorMsg = useAppSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const onSubmit: SubmitHandler<{ email: string }> = ({ email }) => {
    const from = `test-front-admin <ai73a@yandex.by>`;
    const message = `<div  style="padding: 15px">
password recovery link: 
<a href='https://friday-project-two.vercel.app/#/set-new-password/$token$'>
click to change password</a>
</div>`;
    forgotPassword({ email, from, message });
  };

  const handleNavigate = () => {
    nav(appRoutes.LOGIN);
  };
  if (isForgot) {
    nav(appRoutes.CHECKEMAIL);
  }
  return (
    <Box>
      <Card sx={{ width: 413, m: '40px auto', py: 3, pr: 2, pl: 2 }}>
        <CardContent>
          <Typography variant={'h5'} fontWeight={'Bold'} textAlign={'center'}>
            Forgot your password?
          </Typography>
          <FormControl variant="standard" sx={{ mt: 8 }} fullWidth>
            <TextField
              id="outlined-helperText"
              label="Email"
              variant="standard"
              {...register('email', { required: 'Email Address is required' })}
              error={!!errors.email}
            />
            <Box height="24px">
              {errors.email && (
                <Typography variant="body2" color="error">
                  {errors.email.message}
                </Typography>
              )}
            </Box>
          </FormControl>
          <Typography sx={{ opacity: 0.5 }}>
            Enter your email address and we will send you further instructions
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', flexDirection: 'column', gap: '31px', px: 3 }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ borderRadius: 30, bgcolor: '#366EFF', mt: 5 }}
            onClick={handleSubmit(onSubmit)}
          >
            Send Instructions
          </Button>
          <Box
            display={'flex'}
            flexDirection={'column'}
            height={'60px'}
            justifyContent={'space-evenly'}
          >
            <Typography
              fontWeight="bold"
              color={'#000000'}
              sx={{ opacity: '0.5' }}
              variant="body2"
            >
              Did you remember your password?
            </Typography>

            <Link
              onClick={handleNavigate}
              component="button"
              variant="body1"
              fontWeight="bold"
            >
              Try logging in
            </Link>
          </Box>
        </CardActions>
      </Card>
      <AlertError errorMsg={errorMsg} onCloseAction={setErrorMsg} />
    </Box>
  );
};

export default ForgotPasswordPage;
