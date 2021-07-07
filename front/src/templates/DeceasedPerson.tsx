import React, { useState, FC } from 'react';
import { Inner } from '../components/inner';
import { useAppSelector } from '../app/hooks';
import { selectTotalDeth } from '../features/graphs/totalDeathSlice';
import { AreaReChart, LineReChart } from '../components/organisms';
import {
  OrangeButton,
  ReferenceDataLink,
  TypographyTitle,
} from '../components/atoms';

interface DeceasedData {
  date: string;
  ndeaths: number;
}

const DeceasedPerson: FC = () => {
  const totalDeth = useAppSelector(selectTotalDeth);
  const dethPerson: DeceasedData[] = totalDeth.data;
  const [dayDethPerson, setDayDethPerson] = useState<DeceasedData[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);

  // 累計への切り替え
  const changeToggle = (): void => {
    setToggle(true);
  };

  // 日別への切り替え
  const changeDay = (): void => {
    let daysData: DeceasedData[] = [];
    let count: number = 0;
    let dethPersonDay: DeceasedData = {
      date: '',
      ndeaths: 0,
    };
    dethPerson.forEach((data, index) => {
      count = data.ndeaths - dethPersonDay.ndeaths;
      let pushData: DeceasedData = {
        date: data.date,
        ndeaths: count,
      };
      // １つ目は引く値がないので省く
      if (index !== 0) {
        daysData.push(pushData);
      }
      dethPersonDay = data;
    });
    setDayDethPerson(daysData);
    setToggle(false);
  };

  return (
    <Inner>
      {toggle ? (
        <>
          <TypographyTitle variant={'h5'} align='center'>
            死亡者数推移（累計）
          </TypographyTitle>
          <OrangeButton label={'累計'} onClick={changeToggle} />
          <OrangeButton label={'日別'} onClick={changeDay} />
          <AreaReChart
            data={dethPerson}
            xDataKey={'date'}
            areaDataKey={'ndeaths'}
            areaName={'死亡者数'}
          />
        </>
      ) : (
        <>
          <TypographyTitle variant={'h5'} align='center'>
            死亡者数推移（日別）
          </TypographyTitle>
          <OrangeButton label={'累計'} onClick={changeToggle} />
          <OrangeButton label={'日別'} onClick={changeDay} />
          <LineReChart
            data={dayDethPerson}
            xDataKey={'date'}
            lineDataKey={'ndeaths'}
            lineName={'死亡者数'}
            startIndex={dayDethPerson.length - 31}
            endIndex={dayDethPerson.length - 1}
          />
        </>
      )}
      <ReferenceDataLink
        label={'新型コロナウイルス感染症対策'}
        href={'https://corona.go.jp/dashboard/'}
      />
    </Inner>
  );
};

export default DeceasedPerson;
