import React, { useEffect, useState, FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectBedOccupancyRate } from '../../features/graphs/bedOccupancyRateSlice';

const TodayBedOccupancyRate: FC = () => {
  const bedOccupancyRate = useAppSelector(selectBedOccupancyRate);
  const [bedUsed, setBedUsed] = useState(bedOccupancyRate.data);

  useEffect(() => {
    setBedUsed(bedOccupancyRate.data);
  }, [bedOccupancyRate]);

  let todayBedRate: string | undefined;
  let yesterdayBedRate: string | undefined;
  let dayBeforeYesterdayBedRate: string | undefined;

  // 対策病床使用率を算出
  // 入院者数*入院患者受入確保病床=入院患者病床使用率
  let sumBed: number = 0;
  bedOccupancyRate.data.forEach((todayBed) => {
    sumBed += todayBed.secure_bed;
  });

  let sumInpatient: number = 0;
  bedOccupancyRate.data.forEach((todayInpatient) => {
    sumInpatient += todayInpatient.inpatient;
  });

  let totalBedUsed: string = ((sumInpatient / sumBed) * 100).toFixed(2);

  return (
    <>
      <h2 style={{ fontSize: '24px' }}>対策病床使用率(参考)※</h2>
      <h2 style={{ fontSize: '40px' }}>{Number(totalBedUsed)}%</h2>
      <h2
        style={
          Number(totalBedUsed) > 50
            ? { background: '#ff2b2b' }
            : Number(totalBedUsed) > 25
            ? { background: '#ff8080' }
            : Number(totalBedUsed) > 5
            ? { background: '#ffd5d5' }
            : { background: '#ffff' }
        }
      >
        {Number(totalBedUsed) > 50
          ? 'ステージ4'
          : Number(totalBedUsed) > 25
          ? 'ステージ3'
          : Number(totalBedUsed) > 5
          ? 'ステージ2'
          : 'ステージ1'}
      </h2>
    </>
  );
};
export default TodayBedOccupancyRate;
