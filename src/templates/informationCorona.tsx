import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useAppSelector } from '../app/hooks';
import LoadingPage from '../components/molecules/LoadingPage';
import Inner from '../components/atoms/Inner';
import InformetionTodayCorona from '../components/atoms/InformetionTodayCorona';
import TodayCorona from '../components/atoms/TodayCorona';
import TodayDeth from '../components/atoms/TodayDeth';
import TodayPcr from '../components/atoms/TodayPcr';
import TodayBedOccupancyRate from '../components/atoms/TodayBedOccupancyRate';

import { selectTotalCorona } from '../features/graphs/totalCoronaSlice';
import { selectTotalDeth } from '../features/graphs/totalDethSlice';
import { selectBedOccupancyRate } from '../features/graphs/bedOccupancyRateSlice';
import { selectDailyPositive } from '../features/graphs/dailyPositiveSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fd7e00',
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    height: '250px',
    margin: '10px',
  },
}));

const InformationCorona: FC = () => {
  const classes = useStyles();
  const totalCorona = useAppSelector(selectTotalCorona);
  const totalDeth = useAppSelector(selectTotalDeth);
  const bedOccupancyRate = useAppSelector(selectBedOccupancyRate);
  const positivRate = useAppSelector(selectDailyPositive);

  return (
    <div>
      <Inner>
        {totalCorona.status === 'loading' ||
        totalDeth.status === 'loading' ||
        bedOccupancyRate.status === 'loading' ||
        positivRate.status === 'loading' ? (
          <LoadingPage />
        ) : (
          <>
            <h1 style={{ textAlign: 'center' }}>
              新型コロナウイルス 日本国内の状況
            </h1>
            <div className={classes.root}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <TodayBedOccupancyRate />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <TodayCorona />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <TodayDeth />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper className={classes.paper}>
                    <TodayPcr />
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <InformetionTodayCorona />
          </>
        )}{' '}
      </Inner>
    </div>
  );
};
export default InformationCorona;
