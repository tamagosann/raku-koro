import React from 'react';
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

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer id="footer" className={classes.footer}>
      <MediaQuery query="(min-width: 600px)">
        <div className={classes.flexContainer}>
          <p>&copy;{new Date().getFullYear()} Rakuraku Corona</p>
          <div>
            <h3 className={classes.displayDevelopers}>共同開発者</h3>
            <div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>豊山政一</p>
                <p>秋山太郎</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>工藤大輝</p>
                <p>坂本篤弥</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>春日崇希</p>
                <p>大谷走</p>
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
                <p className={classes.nameMargin}>豊山政一</p>
                <p>秋山太郎</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>工藤大輝</p>
                <p>坂本篤弥</p>
              </div>
              <div className={classes.flexItem}>
                <p className={classes.nameMargin}>春日崇希</p>
                <p>大谷走</p>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
    </footer>
  );
};
