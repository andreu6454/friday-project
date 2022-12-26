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
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AlertError } from '../../../components';
import { appRoutes } from '../../../routes';
import { forgotPassword } from '../../../store/middleware/authUser';
import { useAppDispatch, useAppSelector } from '../../../store/store';

}
export const ForgotPasswordPage = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const isForgot = useAppSelector((state) => state.auth.isForgotEmail);
  const errorMsg = useAppSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = ({ email }: IFormInput) => {
    const from = `test-front-admin <ai73a@yandex.by>`;
    const message = `<div  style="padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
click to change password</a>
</div>`;
    dispatch(forgotPassword({ email, from, message }));
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
            <Link
              color={'#000000'}
              sx={{ opacity: 0.5, textAlign: 'center' }}
              component="button"
              variant="body2"
              underline="none"
              mb={2}
            >
              Did you remember your password?
            </Link>
            <Link
              onClick={handleNavigate}
              sx={{ textAlign: 'center' }}
              component="button"
              variant="body1"
              fontWeight="bold"
            >
              Try logging in
            </Link>
          </Box>
        </CardActions>
      </Card>
      <AlertError errorMsg={errorMsg} />
    </Box>
  );
};
