import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { createWrapperAndAppendToBody } from '../../utils/portal-wrapper';

interface ReactPortalProps {
  children: ReactNode;
  wrapperId?: string;
}

export const ReactPortal: FC<ReactPortalProps> = ({
  children,
  wrapperId = 'react-portal-wrapper',
}) => {
  let element = document.getElementById(wrapperId);
  // if element is not found with wrapperId,
  // create and append to body
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, element);
};
