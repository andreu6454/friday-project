import { Grid, Slider, styled, TextField } from '@mui/material';
import { useActions } from 'hooks';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { filterActions } from 'store/slices/fliter-slice';
import { useAppSelector } from 'store/store';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const DoubleSlider = () => {
  const minMaxCount = useAppSelector((state) => state.filter.minMax);
  const [display, setDisplay] = useState(minMaxCount);

  const { setMinMax } = useActions(filterActions);

  const onMinMaxChanged = useMemo(() => debounce(setMinMax, 500), []);

  const onChangeSlider = (event: Event, newValue: number | number[]) => {
    setDisplay(newValue as number[]);
    onMinMaxChanged(newValue);
  };

  useEffect(() => {
    setDisplay(minMaxCount);
  }, [minMaxCount]);

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
      <Grid item>
        <StyledTextField
          value={minMaxCount[0]}
          size="small"
          sx={{ width: '60px' }}
          inputProps={{
            style: { textAlign: 'center' },
          }}
          disabled
        />
      </Grid>
      {/* min input value */}
      <Grid item sx={{ flexGrow: 1 }}>
        <Slider
          sx={{ minWidth: '100%' }}
          getAriaLabel={() => 'Data filter range'}
          value={display}
          onChange={onChangeSlider}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Grid>
      {/* max input value */}
      <Grid item>
        <StyledTextField
          value={minMaxCount[1]}
          size="small"
          sx={{ width: '60px' }}
          inputProps={{
            style: { textAlign: 'center' },
          }}
          disabled
        />
      </Grid>
    </Grid>
  );
};
