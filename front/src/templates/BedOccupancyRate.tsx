import React from 'react';
import { testData } from '../common/test';
import Inner from '../components/inner/Inner';

// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paperStegeOne: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ffff',
    },
    paperStegeSecond: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ffd5d5',
    },
    paperStegeThird: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ff8080',
    },
    paperStegeForth: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ff2b2b',
    },
    backgroundColorStageOne: {},
  })
);

export const BedOccupancyRate = () => {
  const classes = useStyles();

  return (
    <Inner>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {testData.map((element, index) => {
            const useBedRateing =
              (Number(element['入院者数']) /
                Number(element['入院患者受入確保病床'])) *
              100;
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Paper
                  className={
                    useBedRateing >= 50
                      ? classes.paperStegeForth
                      : useBedRateing >= 25
                      ? classes.paperStegeThird
                      : useBedRateing >= 5
                      ? classes.paperStegeSecond
                      : classes.paperStegeOne
                  }
                >
                  <div>
                    <h3>{element['都道府県名']}</h3>
                    <p>{element['入院患者病床使用率']}</p>
                    <p>
                      {element['入院者数']} / {element['入院患者受入確保病床']}
                    </p>
                  </div>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Inner>
  );
};
