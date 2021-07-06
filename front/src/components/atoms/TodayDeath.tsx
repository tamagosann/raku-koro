import React, {  FC, useMemo } from 'react';

import {GraphState} from '../../features/graphs/totalDethSlice';

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
    coronaToday = totalCorona.data[index1].ndeaths;
    coronaYesterday = (totalCorona.data[index1].ndeaths -
      totalCorona.data[index2].ndeaths) as number;
    coronaDayBeforeYesterday =
      totalCorona.data[index1].ndeaths - totalCorona.data[index3].ndeaths;
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

const TodayDeth: FC<Props> = (props) => {

  const corona = useMemo(() => {
    return coronaCalculation(props.totalCorona);
  }, [props.totalCorona, coronaCalculation]);

  return (
    <>
      <h2 style={{ fontSize: '24px' }}>累計死亡者数</h2>
      <h2 style={{ fontSize: '32px' }}>
        {corona.today.toLocaleString()}人
      </h2>
      <h3 style={{ fontSize: '24px' }}>
        前日比：＋
        {corona.yesterday.toLocaleString()}人
      </h3>
      <h3 style={{ fontSize: '24px' }}>
        前々日比：＋
        {corona.beforeYesterday.toLocaleString()}
        人
      </h3>
    </>
  );
};
export default TodayDeth;
