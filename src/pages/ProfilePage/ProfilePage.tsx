import React from 'react';
import { Link } from 'react-router-dom';

import { appRoutes } from '../../routes';

export const ProfilePage = () => {
  return (
    <div>
      <div>
        <Link to={appRoutes.CARDPACKS}>LINK</Link>
      </div>
      Profile
    </div>
  );
};
