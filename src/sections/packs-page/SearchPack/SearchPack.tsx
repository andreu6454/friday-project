import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { useActions } from 'hooks';
import { debounce } from 'lodash';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { filterActions } from 'store/slices/fliter-slice';
import { useAppSelector } from 'store/store';
import { StyledTextField } from 'styles/styles';

export const SearchPack = () => {
  const { setSearchValue } = useActions(filterActions);

  const searchValue = useAppSelector((state) => state.filter.searchValue);

  const [displayValue, setDisplayValue] = useState(searchValue);
  const onValueChanged = useMemo(() => debounce(setSearchValue, 500), []);

  const handleSearchChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setDisplayValue(event.target.value);
    onValueChanged(event.target.value);
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
