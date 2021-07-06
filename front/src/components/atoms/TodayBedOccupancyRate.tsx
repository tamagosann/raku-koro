import React, { useEffect, useState, FC } from 'react';
import { GraphState } from '../../features/graphs/bedOccupancyRateSlice';
interface Data {
  pcr_positive: number;
  injured: number;
  secure_bed: number;
  use_bed_rate: string;
  inpatient: number;
  source: string;
  update: string;
  home_recuperator: number;
  prefecture: string;
  pref_code: number;
  injured_bed: number;
  use_injured_bed_rate: string;
}
interface Props {
  bedOccupancyRate: GraphState;
}

const calcSumBed = (bedOccupancyRate: GraphState) => {
  // 対策病床使用率を算出
  // 入院者数*入院患者受入確保病床=入院患者病床使用率
  let sumBed: number = 0;
  bedOccupancyRate.data.forEach((todayBed: Data) => {
    sumBed += todayBed.secure_bed;
  });
  return sumBed;
};
const calcSumInpatient = (bedOccupancyRate: GraphState) => {
  let sumInpatient: number = 0;
  bedOccupancyRate.data.forEach((todayInpatient: Data) => {
    sumInpatient += todayInpatient.inpatient;
  });
  return sumInpatient;
};

const TodayBedOccupancyRate: FC<Props> = ({ bedOccupancyRate }) => {
  const [bedUsed, setBedUsed] = useState(bedOccupancyRate.data);

  useEffect(() => {
    setBedUsed(bedOccupancyRate.data);
  }, [bedOccupancyRate]);

  const sumBed = calcSumBed(bedOccupancyRate);
  const sumInpatient = calcSumInpatient(bedOccupancyRate);
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
