import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { GridCloseIcon } from '@mui/x-data-grid';
import * as React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export function BasicModal({
  children,
  title,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  title: string;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          style: { transitionDuration: '500ms' },
        },
      }}
    >
      <Fade in={open}>
        <Box>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="xs"
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {title}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <GridCloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>{children}</DialogContent>
          </BootstrapDialog>
        </Box>
      </Fade>
    </Modal>
  );
}
