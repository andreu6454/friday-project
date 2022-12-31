import { Preloader } from 'components/Preloader/Preloader';
import { ReactNode, Suspense } from 'react';

export const withSuspense = (component: ReactNode) => {
  return <Suspense fallback={<Preloader />}>{component}</Suspense>;
};
