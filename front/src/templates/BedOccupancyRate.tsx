import React from 'react';
import { useAppSelector } from '../app/hooks';
import Inner from '../components/inner/Inner';
import { PieChart, Pie, Cell } from 'recharts';

// slice
import { selectBedOccupancyRate } from '../features/graphs/bedOccupancyRateSlice';

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

const test = [{ inpatient: 747 }, { secure_bed: 2088 }];
//円グラフの各領域の色を定義
const COLORS = ['#2250A2', '#da50a2'];

export const BedOccupancyRate = () => {
  const classes = useStyles();
  const BedOccupancyRates = useAppSelector(selectBedOccupancyRate);
  console.log('BedOccupancyRates', BedOccupancyRates);

  return (
    <>
      {BedOccupancyRates.status === 'loading' ? null : (
        <Inner>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {BedOccupancyRates.data.map((element, index) => {
                const useBedRateing =
                  (Number(element.inpatient) / Number(element.secure_bed)) *
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
                        <h3>{element.prefecture}</h3>
                        <p>{element.use_bed_rate}</p>
                        <p>
                          {element.inpatient} / {element.secure_bed}
                        </p>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Inner>
      )}
    </>
  );
};
