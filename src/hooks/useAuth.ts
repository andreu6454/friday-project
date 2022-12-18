import { useEffect } from 'react';

import { isAuthUser } from './../store/middleware/authUser';
import { useAppDispatch, useAppSelector } from './../store/store';

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const loading = useAppSelector((state) => state.auth.status);

  const dispatch = useAppDispatch();

  console.log('hook');

  useEffect(() => {
    if (!isAuth) {
      dispatch(isAuthUser());
    }
  }, []);

  return { isAuth, loading };
};
