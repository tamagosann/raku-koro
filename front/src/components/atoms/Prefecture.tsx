import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';

// sliceのimport
import { selectedPrefecture } from '../../features/common/prefectureSlice';

// common.jsから都道府県の情報を取得する
import { prefectures } from '../../common/prefecture';

// マテリアルUI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      display: 'block',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    centerText: {
      textAlign: 'center',
      display: 'block',
    },
    width: {
      width: '250px',
    },
  })
);

export const Prefecture = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [prefecture, setPrefecture] = useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrefecture(event.target.value as string);
    const prefCode = event.target.value as string;
    dispatch(selectedPrefecture(Number(prefCode)));
  };

  return (
    <>
      <FormControl className={classes.formControl + ' ' + classes.centerText}>
        {/* <InputLabel
          className={classes.centerText}
          id="demo-simple-select-helper-label"
        >
          都道府県
        </InputLabel> */}
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={prefecture}
          onChange={handleChange}
          className={classes.width}
        >
          {prefectures.map((prefecture, index) => (
            <MenuItem key={index} value={String(prefecture.prefCode)}>
              {prefecture.prefName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText className={classes.centerText}>
          都道府県を選択してください。
        </FormHelperText>
      </FormControl>
    </>
  );
};
