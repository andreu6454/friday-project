import PanoramaIcon from '@mui/icons-material/Panorama';
import { Box, CardActionArea, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { UploadFileWrapper } from 'components/UploadFileWrapper/UploadFileWrapper';
import { useActions } from 'hooks';
import { FC } from 'react';
import { packActions } from 'store/slices';

interface UploadImageCoverProps {
  cover: string;
  setCover: (v: string) => void;
}

export const UploadImageCover: FC<UploadImageCoverProps> = ({ cover, setCover }) => {
  const { setError } = useActions(packActions);

  const errorHandle = () => {
    setError('Wrong file format');
    setCover('');
  };

  return !cover ? (
    <CardActionArea>
      <UploadFileWrapper setCover={setCover} cover={cover}>
        <Box
          component={'span'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: grey[100],
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100px',
            gap: '5px',
          }}
        >
          <PanoramaIcon sx={{ opacity: '0.5', fontSize: '40px' }} />
          <Typography variant="subtitle2" color="text.secondary">
            Click here to upload cover image
          </Typography>
        </Box>
      </UploadFileWrapper>
    </CardActionArea>
  ) : (
    <Box>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography>Cover</Typography>
        <UploadFileWrapper cover={cover} setCover={setCover}>
          <Link component={'span'} sx={{ cursor: 'pointer' }}>
            Change Cover
          </Link>
        </UploadFileWrapper>
      </Stack>
      <Box sx={{ width: '100%', height: '150px', overflow: 'hidden' }}>
        <img
          src={cover}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onError={errorHandle}
        />
      </Box>
    </Box>
  );
};
