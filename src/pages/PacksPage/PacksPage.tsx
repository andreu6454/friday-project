import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { AlertError, DoubleSlider } from 'components';
import { AlertSuccess } from 'components/AlerSuccess/AlertSucess';
import { useActions, usePacksTableData } from 'hooks';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AddNewPackModal } from 'sections/packs-page/AddNewPackModal';
import { SearchPack } from 'sections/packs-page/SearchPack/SearchPack';
import { PackTable } from 'sections/packs-page/Table/PackTable';
import { packActions } from 'store/slices';
import { useAppSelector } from 'store/store';

const CardPacksPage = () => {
  // const category = useAppSelector((state) => state.filter.category);
  const [searchParams, setSearchParams] = useSearchParams();

  const isMineCategory = searchParams.get('category') === 'my';

  const { setError } = useActions(packActions);

  const { cardData, isLoadingPack, totalCount, error } = usePacksTableData();

  const [openAddNewPackModal, setOpenAddNewPackModal] = useState<boolean>(false);

  const handleQueryCategory = (category: string) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, category });
  };

  return (
    <Box marginTop={2}>
      <AddNewPackModal
        openModal={openAddNewPackModal}
        setOpenModal={setOpenAddNewPackModal}
      />
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">Pack list</Typography>
        <Button variant="contained" onClick={() => setOpenAddNewPackModal(true)}>
          Add new pack
        </Button>
      </Stack>
      {/* filter row */}
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        marginY={5}
        gap={3}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body2">Search</Typography>

          <SearchPack />
        </Box>
        {/* pack category */}
        <Box
          flexGrow={'0.5'}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
        >
          <Typography variant="body2">Show packs cards</Typography>
          <Stack direction="row" gap={1}>
            <Button
              variant={isMineCategory ? 'contained' : 'outlined'}
              onClick={() => handleQueryCategory('my')}
            >
              MY
            </Button>
            <Button
              onClick={() => handleQueryCategory('all')}
              variant={!isMineCategory ? 'contained' : 'outlined'}
            >
              All
            </Button>
          </Stack>
        </Box>
        {/* double slider */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body2">Number of cards</Typography>
          <DoubleSlider />
        </Box>
        {/* filter button */}
        <Box alignSelf="flex-end">
          <IconButton>
            <FilterAltIcon />
          </IconButton>
        </Box>
      </Stack>
      {/* packs not found */}
      {!totalCount ? (
        <Typography textAlign={'center'} mt={20}>
          Колоды с данным фильтром не найдены. Измените параметры поиска
        </Typography>
      ) : null}
      {/* table */}
      {totalCount ? (
        <PackTable
          cardData={cardData}
          loadingStatus={isLoadingPack}
          totalCount={totalCount}
        />
      ) : null}

      <AlertSuccess msg={'Success'} />
      <AlertError errorMsg={error} onCloseAction={setError} />
    </Box>
  );
};

export default CardPacksPage;
