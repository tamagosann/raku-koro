import React from 'react';

// コンポーネント
import {
  InfectedPerson,
  DeceasedPerson
} from '../templates';

import Grid from '@material-ui/core/Grid';

export const NationwideData = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <InfectedPerson />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <DeceasedPerson />
        </Grid>
      </Grid>
    </>
  )
} 