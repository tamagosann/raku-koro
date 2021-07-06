import React, { useEffect, useState, FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTotalCorona } from '../../features/graphs/totalCoronaSlice';

const TodayCorona: FC = () => {
  const totalCorona = useAppSelector(selectTotalCorona);

  const [coronaHuman, setCoronaHuman] = useState(totalCorona.data);

  useEffect(() => {
    setCoronaHuman(totalCorona.data);
  }, [totalCorona]);

  const coronaIndex: number = coronaHuman.length - 1;
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
  }

  return (
    <>
      <div>
        <h2 style={{ fontSize: '24px' }}>累計感染者数</h2>
        <h2 style={{ fontSize: '32px' }}>
          {!coronaToday ? 0 : coronaToday.toLocaleString()}人
        </h2>
        <h3 style={{ fontSize: '24px' }}>
          前日比：＋
          {!coronaYesterday ? 0 : coronaYesterday.toLocaleString()}人
        </h3>
        <h3 style={{ fontSize: '24px' }}>
          前々日比：＋
          {!coronaDayBeforeYesterday
            ? 0
            : coronaDayBeforeYesterday.toLocaleString()}
          人
        </h3>
      </div>
    </>
  );
};
export default TodayCorona;
