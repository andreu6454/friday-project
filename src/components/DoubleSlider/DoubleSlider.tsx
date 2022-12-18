import { Slider } from '@mui/material';
import React from 'react';

function valuetext(value: number) {
  return `${value}°C`;
}

export const DoubleSlider = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Slider
      getAriaLabel={() => 'Temperature range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
    />
  );
};
