import { Grid, Slider, styled, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDebounce } from '../../hooks';
import { useAppSelector } from '../../store/store';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const DoubleSlider = () => {
  const minCount = useAppSelector((state) => state.cards.cardsData.minCardsCount);
  const maxCount = useAppSelector((state) => state.cards.cardsData.maxCardsCount);

  const [value, setValue] = React.useState<number[]>([minCount, maxCount]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    handleQueryParams();
  };

  const handleQueryParams = useDebounce(() => {
    searchParams.set('min', value[0].toString());
    searchParams.set('max', value[1].toString());
    setSearchParams(searchParams, {
      replace: true,
    });
  }, 500);

  const handleChangeStartValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue((prev) => [(prev[0] = +event.target.value), prev[1]]);
  };

  const handleChangeEndValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue((prev) => [prev[0], (prev[1] = +event.target.value)]);
  };

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
      <Grid item>
        <StyledTextField
          value={value[0]}
          onChange={handleChangeStartValue}
          size="small"
          sx={{ width: '50px' }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Slider
          sx={{ minWidth: '100%' }}
          getAriaLabel={() => 'Data filter range'}
          value={value}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Grid>
      <Grid item>
        <StyledTextField
          value={value[1]}
          size="small"
          onChange={handleChangeEndValue}
          sx={{ width: '50px' }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Grid>
  );
};
