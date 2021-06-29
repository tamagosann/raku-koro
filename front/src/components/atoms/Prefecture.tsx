import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// common.jsから都道府県の情報を取得する
import { prefectures } from '../../common/prefecture';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const Prefecture = () => {
  const classes = useStyles();
  const [prefecture, setPrefecture] = useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrefecture(event.target.value as string);
  };
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">都道府県</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={prefecture}
          onChange={handleChange}
        >
          {prefectures.map((prefecture, index) => (
            <MenuItem key={index} value={String(prefecture.prefCode)}>
              {prefecture.prefName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>都道府県を選択してください。</FormHelperText>
      </FormControl>
    </>
  );
};
