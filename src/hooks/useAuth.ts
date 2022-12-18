import { useEffect } from 'react';

import { isAuthUser } from './../store/middleware/authUser';
import { useAppDispatch, useAppSelector } from './../store/store';
export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(isAuthUser());
    }
  }, []);

  return { isAuth };
};
