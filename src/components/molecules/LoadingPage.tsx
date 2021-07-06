import { FC } from "react";
import { Grid } from "@material-ui/core";
import { Inner } from "../atoms";

const LoadingPage: FC = () => {
  return (
    <Inner>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <img
            src={`${process.env.PUBLIC_URL}/img/loading.gif`}
            alt="ローディング"
          />
        </Grid>
        <Grid item>
          <h2>now Loading ....</h2>
        </Grid>
      </Grid>
    </Inner>
  );
};

export default LoadingPage;
