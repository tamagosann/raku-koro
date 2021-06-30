import React from 'react';

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
    contentCenter: {
      display: 'block',
      width: '300px',
      margin: '0 auto',
    },
    centerText: {
      textAlign: 'center',
    },
    width: {
      width: '250px',
    },
  })
);

interface Props {
  prefecture: string;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
}

export const Prefecture = ({ prefecture, setPrefecture }: Props) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrefecture(event.target.value as string);
  };

  return (
    <>
      <FormControl
        className={classes.formControl + ' ' + classes.contentCenter}
      >
        <InputLabel id="demo-simple-select-helper-label">都道府県</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={prefecture}
          onChange={handleChange}
          className={classes.width + ' ' + classes.centerText}
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
