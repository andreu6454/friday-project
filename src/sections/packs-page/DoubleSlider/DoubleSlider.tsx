import { Grid, Slider, styled, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const DoubleSlider = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const min = searchParams.get('min') || '0';
  const max = searchParams.get('max') || '100';

  const [display, setDisplay] = useState([+min, +max]);

  const onMinMaxChanged = useMemo(() => debounce(setSearchParams, 300), []);

  const onChangeSlider = (event: Event, newValue: number | number[]) => {
    setDisplay(newValue as number[]);
    const currentParams = Object.fromEntries([...searchParams]);
    onMinMaxChanged({
      ...currentParams,
      min: display[0].toString(),
      max: display[1].toString(),
    });
  };

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
      <Grid item>
        <StyledTextField
          value={display[0]}
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
          value={display[1]}
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
