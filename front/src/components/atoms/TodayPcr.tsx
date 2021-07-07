import React, { FC, useMemo } from 'react';
import { GraphState } from '../../features/graphs/dailyPositiveSlice';

interface Props {
  positivRate: GraphState;
}
export const pcrCalculation = (positivRate: GraphState) => {
  let todayBedRate: string | undefined;
  let yesterdayBedRate: string | undefined;
  let dayBeforeYesterdayBedRate: string | undefined;

  if (positivRate.status === 'success') {
    let positivRateIndex1: number = positivRate.data.length - 1;
    let positivRateIndex2: number = positivRate.data.length - 2;
    let positivRateIndex3: number = positivRate.data.length - 3;
    let todayPositiv: number =
      positivRate.data[positivRateIndex1].daily_positive;
    let yesterdayPositiv: number =
      positivRate.data[positivRateIndex2].daily_positive;
    let dayBeforeYesterdayPositiv: number =
      positivRate.data[positivRateIndex3].daily_positive;
    // PCR検査数を算出
    let todayPcr: number = positivRate.data[positivRateIndex1].daily_pcr;
    let yesterdayPcr: number = positivRate.data[positivRateIndex2].daily_pcr;
    let dayBeforeYesterdayPcr: number =
      positivRate.data[positivRateIndex3].daily_pcr;

    todayBedRate = ((todayPositiv / todayPcr) * 100).toFixed(2);
    yesterdayBedRate = ((yesterdayPositiv / yesterdayPcr) * 100).toFixed(2);
    dayBeforeYesterdayBedRate = (
      (dayBeforeYesterdayPositiv / dayBeforeYesterdayPcr) *
      100
    ).toFixed(2);
    return {
      today: todayBedRate,
      yesterday: yesterdayBedRate,
      beforeYesterday: dayBeforeYesterdayBedRate,
    };
  } else {
    return {
      today: 0,
      yesterday: 0,
      beforeYesterday: 0,
    };
  }
};

const TodayPcr: FC<Props> = ({ positivRate }) => {
  const pcr = useMemo(() => {
    return pcrCalculation(positivRate);
  }, [positivRate, pcrCalculation]);

  return (
    <>
      <h2 style={{ fontSize: '24px' }}>PCR検査陽性率</h2>
      <h2 style={{ fontSize: '32px' }}>{pcr.today}%</h2>
      <h3 style={{ fontSize: '24px' }}>
        前日：
        {pcr.yesterday}%
      </h3>
      <h3 style={{ fontSize: '24px' }}>
        前々日：
        {pcr.beforeYesterday}%
      </h3>
    </>
  );
};
export default TodayPcr;
