import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';

export const EditMenu = () => {
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
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} spacing={2}>
            <EditIcon />
            <Typography variant="body1">Edit</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} spacing={2}>
            <DeleteIcon />
            <Typography variant="body1">Delete</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction={'row'} spacing={2}>
            <SchoolIcon />
            <Typography variant="body1">Learn</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
};
