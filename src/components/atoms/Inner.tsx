import { Container, Paper } from '@material-ui/core';
import { FC } from 'react';

const Inner: FC = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        component="div"
        style={{ padding: 20, marginTop: 90, borderColor: "#fd7e00", borderWidth: "2px" }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default Inner;
