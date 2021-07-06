import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: '#fd7e00',
      color: '#fff',
      position: 'absolute',
      bottom: '0',
      width: '100%',
    },
    displayDevelopers: {
      textAlign: 'center',
    },
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 80px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    flexContainerColum: {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 80px',
    },
    flexItem: {
      display: 'flex',
      alignItems: 'center',
    },
    nameMargin: {
      marginRight: '16px',
    },
  })
);

export const Footer: FC = () => {
  const classes = useStyles();
  return (
    <footer id="footer" className={classes.footer} data-testid="footer-tag">
      <MediaQuery query="(min-width: 600px)">
        <div className={classes.flexContainer}>
          <p>&copy;{new Date().getFullYear()} Rakuraku Corona</p>
          <div>
            <h3 className={classes.displayDevelopers}>共同開発者</h3>
            <div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>M.T</p>
                <p>T.A</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>D.K</p>
                <p>A.S</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>T.K</p>
                <p>K.O</p>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 599px)">
        <div className={classes.flexContainerColum}>
          <p>&copy;{new Date().getFullYear()} Rakuraku Corona</p>
          <div>
            <h3 className={classes.displayDevelopers}>共同開発者</h3>
            <div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>M.T</p>
                <p>T.A</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>D.K</p>
                <p>A.S</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>T.K</p>
                <p>K.O</p>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
    </footer>
  );
};
