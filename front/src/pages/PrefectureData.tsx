import React from 'react';

// コンポーネント
import { PrefectureDailyDead } from '../templates/PrefectureDailyDead';
import PrefectureDailyInfention from '../templates/PrefectureDailyInfection';

// マテリアルUI
import Grid from '@material-ui/core/Grid';

export const PrefectureData = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <PrefectureDailyDead />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <PrefectureDailyInfention />
        </Grid>
      </Grid>
    </>
  );
};
