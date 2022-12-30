import { Box, Button, Stack, Typography } from '@mui/material';
import { BackLinkButton } from 'components';
import { Preloader } from 'components/Preloader/Preloader';
import { useCardsTableData } from 'hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { CardsTable } from 'sections/cards-page/CardsTable';
import { HandleMenu } from 'sections/cards-page/HandleMenu';
import { NewCardModal } from 'sections/cards-page/NewCardModal';
import { EditPackModal } from 'sections/packs-page/EditPackModal';

export const CardsPage = () => {
  const nav = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const {
    totalCount,
    page,
    renderActionsCells,
    isLoadingStatus,
    pageCount,
    setNewPage,
    setPageCount,
    cards,
    status,
    isUserPackOwner,
    packName,
    id: packId,
  } = useCardsTableData();

  const handleModal = () => {
    setOpenModal(true);
  };

  const learnHandleNavigate = () => {
    nav('learn');
  };

  if (status === 'loading' && !cards.length) {
    return <Preloader />;
  }

  return (
    <Box marginTop={3}>
      {packId && (
        <NewCardModal packId={packId} setOpenModal={setOpenModal} openModal={openModal} />
      )}
      <Stack direction={'row'} justifyContent="space-between">
        <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton>
        {isUserPackOwner && cards.length ? (
          <Button variant="contained" onClick={handleModal}>
            Add new card
          </Button>
        ) : null}
        {!isUserPackOwner && cards.length ? (
          <Button variant="contained" onClick={learnHandleNavigate}>
            Start Learn
          </Button>
        ) : null}
      </Stack>
      <Box display="flex" flexDirection="column" alignItems="center" marginY={3} gap={3}>
        <Typography variant="h5" alignSelf="flex-start" textAlign="left">
          <Stack direction={'row'}>
            {packName}
            {packId && <HandleMenu packId={packId} packName={packName} />}
          </Stack>
        </Typography>
        {!cards.length && isUserPackOwner ? (
          <Stack alignItems="center" gap={3} marginTop={10}>
            <Typography variant="body2">
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button variant="contained" onClick={handleModal}>
              Add new card
            </Button>
          </Stack>
        ) : null}
        {!cards.length && !isUserPackOwner ? (
          <Typography variant="body2">This pack is empty</Typography>
        ) : null}

        {cards.length ? (
          <CardsTable
            totalCount={totalCount}
            page={page}
            renderActionsCells={renderActionsCells}
            isLoadingStatus={isLoadingStatus}
            pageCount={pageCount}
            setNewPage={setNewPage}
            setPageCount={setPageCount}
          />
        ) : null}
      </Box>
    </Box>
  );
};
