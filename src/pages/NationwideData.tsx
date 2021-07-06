import React, { FC } from "react";

// コンポーネント
import { InfectedPerson, DeceasedPerson } from "../templates";

import Grid from "@material-ui/core/Grid";

const NationwideData: FC = () => {
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
  );
};

export default NationwideData;
