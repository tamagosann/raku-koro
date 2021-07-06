import React, { useEffect, useState, FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectDailyPositive } from '../../features/graphs/dailyPositiveSlice';

const TodayPcr: FC = () => {
  const positivRate = useAppSelector(selectDailyPositive);
  const [coronaPositiv, setcoronaPositiv] = useState(positivRate.data);

  useEffect(() => {
    setcoronaPositiv(positivRate.data);
  }, [positivRate]);

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
  }

  return (
    <>
      <h2 style={{ fontSize: '24px' }}>PCR検査陽性率</h2>
      <h2 style={{ fontSize: '32px' }}>{todayBedRate}%</h2>
      <h3 style={{ fontSize: '24px' }}>
        前日：
        {yesterdayBedRate}%
      </h3>
      <h3 style={{ fontSize: '24px' }}>
        前々日：
        {dayBeforeYesterdayBedRate}%
      </h3>
    </>
  );
};
export default TodayPcr;
