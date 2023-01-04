import { Box, Button, Stack, Typography } from '@mui/material';
import { AlertError, BackLinkButton } from 'components';
import { Preloader } from 'components/Preloader/Preloader';
import { useActions, useCardsTableData } from 'hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { CardsTable } from 'sections/cards-page/CardsTable';
import { EditPackMenu } from 'sections/cards-page/EditPackMenu';
import { NewCardModal } from 'sections/cards-page/NewCardModal';
import { cardActions } from 'store/slices';
import { useAppSelector } from 'store/store';

export const CardsPage = () => {
  const errorMessage = useAppSelector((state) => state.cards.error);
  const packUserId = useAppSelector((state) => state.cards.cardsData.packUserId);
  const loginUserId = useAppSelector((state) => state.user.user._id);
  const deckCover = useAppSelector((state) => state.cards.cardsData.deckCover);
  const isPrivatePack = useAppSelector((state) => state.cards.cardsData.private);
  const status = useAppSelector((state) => state.cards.status);

  const nav = useNavigate();
  const { setError } = useActions(cardActions);
  const [openAddNewCardModal, setOpenAddNewCardModal] = useState(false);
  const { totalCount, cards, packName, id: packId } = useCardsTableData();

  const isUserPackOwner = packUserId === loginUserId;
  const isFetchingCards = status === 'loading';

  const handleModal = () => {
    setOpenAddNewCardModal(true);
  };

  const learnHandleNavigate = () => {
    nav('learn');
  };

  if (isFetchingCards && !cards.length) {
    return <Preloader />;
  }

  return (
    <Box marginTop={3}>
      {packId ? (
        <NewCardModal
          packId={packId}
          openModal={openAddNewCardModal}
          setOpenModal={setOpenAddNewCardModal}
        />
      ) : null}
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
            <Typography variant="h4">{packName}</Typography>
            {packId && isUserPackOwner ? (
              <EditPackMenu
                deckCover={deckCover}
                isPrivatePack={isPrivatePack}
                packId={packId}
                packName={packName}
              />
            ) : null}
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
            isFetchingCards={isFetchingCards}
            cards={cards}
            totalCount={totalCount}
          />
        ) : null}
      </Box>

      <AlertError errorMsg={errorMessage} onCloseAction={setError} />
    </Box>
  );
};

export default CardsPage;
