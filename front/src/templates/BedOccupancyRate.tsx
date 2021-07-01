import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import Inner from '../components/inner/Inner';

//react-modal
import Modal from 'react-modal';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// slice
import { selectBedOccupancyRate } from '../features/graphs/bedOccupancyRateSlice';

// マテリアルUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

Modal.setAppElement('#root');

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
    },
    paperStegeSecond: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ffd5d5',
    },
    paperStegeThird: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ff8080',
    },
    paperStegeForth: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#ff2b2b',
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

const ModalPreview = ({ element, customStyles, data, useBedRateing }: any) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div onClick={openModal}>
        <h3>{element.prefecture}</h3>
        <p>{element.use_bed_rate}</p>
        <p>
          {element.inpatient} / {element.secure_bed}
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>
          {element.prefecture} 病床使用率{' '}
          {((element.inpatient / element.secure_bed) * 100).toFixed(2)} % (参考)
        </h2>
        <PieChart width={400} height={400} style={{ margin: '0 auto' }}>
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
          {/* Tooltipに表示される単位を選定 */}
          <Tooltip
            formatter={(value: number) => {
              return `${value}%`;
            }}
          />
        </PieChart>
        <p>PCR検査陽性者数：{element.pcr_positive}人</p>
        <p>うち重症者数：{element.injured}人</p>
        <p>入院患者受入確保病床：{element.secure_bed}床</p>
        <p>入院者数：{element.inpatient}人</p>
        <p>出典：{element.source}</p>
        <p>最終更新日：{element.update}</p>
      </Modal>
    </>
  );
};

export const BedOccupancyRate = () => {
  // let subtitle:any;

  const classes = useStyles();
  const BedOccupancyRates = useAppSelector(selectBedOccupancyRate);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
      {BedOccupancyRates.status === 'loading' ? null : (
        <Inner>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {BedOccupancyRates.data.map((element, index) => {
                const data = [
                  {
                    name: '病床空き率',
                    value: Math.round(
                      100 - (element.inpatient / element.secure_bed) * 100
                    ),
                  },
                  {
                    name: '病床使用率',
                    value: Math.round(
                      (element.inpatient / element.secure_bed) * 100
                    ),
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
                      <ModalPreview
                        data={data}
                        useBedRateing={useBedRateing}
                        customStyles={customStyles}
                        element={element}
                      />
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
