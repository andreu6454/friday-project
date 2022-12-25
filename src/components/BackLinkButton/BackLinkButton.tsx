import { ArrowBack } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface BackLinkButtonProps {
  link: string;
}

export const BackLinkButton: FC<BackLinkButtonProps> = ({ link }) => {
  return (
    <Link
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
      <Typography variant={'body1'}>Back To Pack List</Typography>
    </Link>
  );
};
