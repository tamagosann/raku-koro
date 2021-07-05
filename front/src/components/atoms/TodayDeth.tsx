import React, { useEffect, useState, FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTotalDeth } from '../../features/graphs/totalDethSlice';

const TodayDeth: FC = () => {
  const totalDeth = useAppSelector(selectTotalDeth);
  const [dethHuman, setDethHuman] = useState(totalDeth.data);

  useEffect(() => {
    setDethHuman(totalDeth.data);
  }, [totalDeth]);

  let dethToday: number | undefined;
  let dethYesterday: number | undefined;
  let dethDayBeforeYesterday: number | undefined;

  // コロナ死亡者算出
  if (totalDeth.status === 'success') {
    let index4: number = totalDeth.data.length - 1;
    let index5: number = totalDeth.data.length - 2;
    let index6: number = totalDeth.data.length - 3;
    dethToday = totalDeth.data[index4].ndeaths;
    dethYesterday = (totalDeth.data[index4].ndeaths -
      totalDeth.data[index5].ndeaths) as number;
    dethDayBeforeYesterday = (totalDeth.data[index4].ndeaths -
      totalDeth.data[index6].ndeaths) as number;
  }

  return (
    <>
      <h2 style={{ fontSize: '24px' }}>累計死亡者数</h2>
      <h2 style={{ fontSize: '32px' }}>
        {!dethToday ? 0 : dethToday.toLocaleString()}人
      </h2>
      <h3 style={{ fontSize: '24px' }}>
        前日比：＋
        {!dethYesterday ? 0 : dethYesterday.toLocaleString()}人
      </h3>
      <h3 style={{ fontSize: '24px' }}>
        前々日比：＋
        {!dethDayBeforeYesterday ? 0 : dethDayBeforeYesterday.toLocaleString()}
        人
      </h3>
    </>
  );
};
export default TodayDeth;
