import { ReactNode, Suspense } from 'react';
import { Preloader } from 'sections/login-page/Preloader';

export const withSuspense = (component: ReactNode) => {
  return <Suspense fallback={<Preloader />}>{component}</Suspense>;
};
