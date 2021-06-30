import React from 'react';

// マテリアルUI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

interface Props {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DailyTotalRadio = ({ value, handleChange }: Props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">日別 / 累計</FormLabel>
      <RadioGroup
        aria-label="corona"
        name="coronaStatus"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="0"
          control={<Radio color="primary" />}
          label="日別"
        />
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="累計"
        />
      </RadioGroup>
    </FormControl>
  );
};
