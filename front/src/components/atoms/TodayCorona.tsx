import React, { FC, useMemo } from 'react';
import { GraphState } from '../../features/graphs/totalCoronaSlice';

interface Props {
  totalCorona: GraphState;
}
export const coronaCalculation = (totalCorona: GraphState) => {
  let coronaToday: number | undefined;
  let coronaYesterday: number | undefined;
  let coronaDayBeforeYesterday: number | undefined;

  if (totalCorona.status === 'success') {
    // コロナ感染者算出
    let index1: number = totalCorona.data.length - 1;
    let index2: number = totalCorona.data.length - 2;
    let index3: number = totalCorona.data.length - 3;
    coronaToday = totalCorona.data[index1].npatients;
    coronaYesterday = (totalCorona.data[index1].npatients -
      totalCorona.data[index2].npatients) as number;
    coronaDayBeforeYesterday =
      totalCorona.data[index1].npatients - totalCorona.data[index3].npatients;
    return {
      today: coronaToday,
      yesterday: coronaYesterday,
      beforeYesterday: coronaDayBeforeYesterday,
    };
  } else {
    return {
      today: 0,
      yesterday: 0,
      beforeYesterday: 0,
    };
  }
};

const TodayCorona: FC<Props> = ({ totalCorona }) => {
  const corona = useMemo(() => {
    return coronaCalculation(totalCorona);
  }, [totalCorona, coronaCalculation]);
  return (
    <>
      <div>
        <h2 style={{ fontSize: '24px' }}>累計感染者数</h2>
        <h2 style={{ fontSize: '32px' }}>{corona.today.toLocaleString()}人</h2>
        <h3 style={{ fontSize: '24px' }}>
          前日比：＋
          {corona.yesterday.toLocaleString()}人
        </h3>
        <h3 style={{ fontSize: '24px' }}>
          前々日比：＋
          {corona.beforeYesterday.toLocaleString()}人
        </h3>
      </div>
    </>
  );
};
export default TodayCorona;
