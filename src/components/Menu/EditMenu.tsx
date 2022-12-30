import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';

export const EditMenu = ({ menuItems }: { menuItems: any[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ExpandCircleDownOutlinedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((el) => (
          <MenuItem key={el.id} onClick={handleClose}>
            <Stack direction={'row'} spacing={2} onClick={el.action}>
              <el.icon />
              <Typography variant="body1">{el.name}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
