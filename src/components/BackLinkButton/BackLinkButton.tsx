import { ArrowBack } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BackLinkButtonProps {
  link: string;
  children: ReactNode;
}

export const BackLinkButton: FC<BackLinkButtonProps> = ({ link, children, ...props }) => {
  return (
    <Link
      {...props}
      to={link}
      style={{
        gap: '8px',
        color: 'black',
        textDecoration: 'none',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <ArrowBack />
      <Typography variant={'body1'}>{children}</Typography>
    </Link>
  );
};
