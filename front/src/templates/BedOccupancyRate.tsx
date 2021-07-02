import React,{FC} from 'react';
import { useAppSelector } from '../app/hooks';
import Inner from '../components/inner/Inner';
import { TypographyTitle } from '../components/atoms';
// slice
import { selectBedOccupancyRate } from '../features/graphs/bedOccupancyRateSlice';
// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ModalPreview } from '../components/molecules/ModalPreview';

// Modal.setAppElement("#root");

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
      cursor: 'pointer',
    },
    paperStegeSecond: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ffd5d5',
      cursor: 'pointer',
    },
    paperStegeThird: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ff8080',
      cursor: 'pointer',
    },
    paperStegeForth: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ff2b2b',
      cursor: 'pointer',
    },
  })
);
export const BedOccupancyRate:FC = () => {
  const classes = useStyles();
  const BedOccupancyRates = useAppSelector(selectBedOccupancyRate);

  return (
    <>
      {BedOccupancyRates.status === 'loading' ? null : (
        <Inner>
          <TypographyTitle align={'center'} variant="h5">
            都道府県別病床使用率
          </TypographyTitle>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {BedOccupancyRates.data.map((element, index) => {
                const data = [
                  {
                    name: '推定病床残数',
                    value: element.secure_bed - element.inpatient,
                  },
                  {
                    name: '入院者数',
                    value: element.inpatient,
                  },
                ];
                const useBedRateing =
                  (Number(element.inpatient) / Number(element.secure_bed)) *
                  100;
                return (
                  <Grid key={index} item xs={6} sm={6} md={3} lg={2} xl={2}>
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
                      <ModalPreview data={data} element={element} />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div>
            <a
              href="https://www.stopcovid19.jp/"
              target="_blank"
              rel="noopener"
            >
              療養状況等及び入院患者受入病床数等に関する調査についてのJSONデータ情報提供:新型コロナウイルス対策ダッシュボード
            </a>
          </div>
          <div>
            <a
              href="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html/"
              target="_blank"
              rel="noopener"
            >
              療養状況等及び入院患者受入病床数等に関する調査についての元データ情報提供:厚生労働省
            </a>
          </div>
        </Inner>
      )}
    </>
  );
};

export default BedOccupancyRate;
