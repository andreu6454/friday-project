import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { debounce } from 'lodash';
import { ChangeEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StyledTextField } from 'styles/styles';

export const SearchPack = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('packName') || '';

  const [displayValue, setDisplayValue] = useState(searchValue);
  const onValueChanged = useMemo(() => debounce(setSearchParams, 500), []);

  const handleSearchChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setDisplayValue(event.target.value);
    const currentParams = Object.fromEntries([...searchParams]);
    onValueChanged({ ...currentParams, packName: event.target.value });
  };

  return (
    <StyledTextField
      onChange={handleSearchChange}
      value={displayValue}
      fullWidth
      hiddenLabel
      id="filled-size-small"
      variant="outlined"
      size="small"
      placeholder="Provide your text"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
