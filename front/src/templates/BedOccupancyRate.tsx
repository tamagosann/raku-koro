import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import Inner from '../components/inner/Inner';

//react-modal
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
// slice
import { selectBedOccupancyRate } from '../features/graphs/bedOccupancyRateSlice';

// 型
import { Data } from '../features/graphs/bedOccupancyRateSlice';

// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

const COLORS = ['#bdc3c7', '#ff2b2b'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any): JSX.Element => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface Props {
  element: Data;
  data: {
    name: string;
    value: number;
  }[];
}

const ModalPreview = ({ element, data }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div onClick={openModal}>
        <h3>{element.prefecture}</h3>
        <p>{element.use_bed_rate}</p>
        <p>
          {element.inpatient.toLocaleString()}人 /{' '}
          {element.secure_bed.toLocaleString()}床
        </p>
      </div>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <h2 style={{ textAlign: 'center' }}>
          {element.prefecture} 病床使用率{' '}
          {((element.inpatient / element.secure_bed) * 100).toFixed(2)} % (参考)
        </h2>
        <ResponsiveContainer width="99%" height={400}>
          <PieChart style={{ margin: '0 auto' }}>
            <Pie
              startAngle={-270}
              data={data}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              stroke="#fd7e00"
              verticalAlign="top"
              wrapperStyle={{ lineHeight: '40px' }}
              fill="#fd7e00"
              payload={[
                {
                  value: `推定病床残数 （${data[0].value.toLocaleString()} 床）`,
                  color: '#bdc3c7',
                },
                {
                  value: `入院者数 （${data[1].value.toLocaleString()} 人）`,
                  color: '#ff2b2b',
                },
              ]}
            />
            <Tooltip
              formatter={(value: any, name: any, props: any) => {
                console.log(value, name, props);
                if (name === '推定病床残数') {
                  return `${value} 床`;
                } else {
                  return `${value} 人`;
                }
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <p>PCR検査陽性者数：{element.pcr_positive.toLocaleString()}人</p>
        <p>うち重症者数：{element.injured.toLocaleString()}人</p>
        <p>入院患者受入確保病床：{element.secure_bed.toLocaleString()}床</p>
        <p>入院者数：{element.inpatient.toLocaleString()}人</p>
        <p style={{ wordBreak: 'break-all' }}>出典：{element.source}</p>
        <p>最終更新日：{element.update}</p>
      </Modal>
    </div>
  );
};

export const BedOccupancyRate = () => {
  // let subtitle:any;

  const classes = useStyles();
  const BedOccupancyRates = useAppSelector(selectBedOccupancyRate);

  return (
    <>
      {BedOccupancyRates.status === 'loading' ? null : (
        <Inner>
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
                      <ModalPreview data={data} element={element} />
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
