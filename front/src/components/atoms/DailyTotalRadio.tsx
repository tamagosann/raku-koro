import React from 'react';

// マテリアルUI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import orange from '@material-ui/core/colors/orange';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: orange[500] },
    secondary: { main: '#0000008A' },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'block',
      width: '300px',
      margin: '0 auto',
      textAlign: 'center',
    },
    flex: {
      display: 'inline-flex',
      flexDirection: 'row',
    },
    marginAlign: {
      marginBottom: '12px',
    },
    labelAlignCenter: {
      textAlign: 'center',
    },
  })
);

interface Props {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DailyTotalRadio = ({ value, handleChange }: Props) => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.wrapper} component="fieldset">
        <RadioGroup
          className={classes.flex}
          aria-label="corona"
          name="coronaStatus"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="0"
            control={<Radio color="primary" />}
            label="累計"
          />
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="日別"
          />
        </RadioGroup>
        <FormHelperText className={classes.labelAlignCenter}>
          累計 / 日別を選択してください。
        </FormHelperText>
      </FormControl>
    </MuiThemeProvider>
  );
};
