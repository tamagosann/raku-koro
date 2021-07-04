import React, { useState, FC } from "react";
import { Inner } from "../components/inner";
import { useAppSelector } from '../app/hooks';
import { selectTotalCorona } from '../features/graphs/totalCoronaSlice';
import { OrangeButton, ReferenceDataLink, TypographyTitle } from "../components/atoms";

// マテリアルUI
import { AreaReChart, LineReChart } from "../components/organisms";

interface InfectedData {
  date: string;
  npatients: number;
  adpatients : number;
}

const InfectedPerson: FC = () => {
  const totalCorona = useAppSelector(selectTotalCorona)
  const cumulativeInfectedPerson: InfectedData[] = totalCorona.data
  const [dayInfectedPerson, setDayInfectedPerson] = useState<InfectedData[]>([])
  const [toggle, setToggle] = useState<boolean>(true)

  // 累計への切り替え
  const changeToggle = (): void => {
    setToggle(true)
  }

  // 日別への切り替え
  const changeDay = (): void => {
    let daysData: InfectedData[] = []
    let count:number = 0
    let infectedPersonDay: InfectedData = {
      date: '',
      npatients: 0,
      adpatients: 0
    }
    cumulativeInfectedPerson.forEach((data, index) => {
      count = data.npatients - infectedPersonDay.npatients
      let pushData: InfectedData = {
        date: data.date,
        npatients: count,
        adpatients: 0
      }
      // １つ目は引く値がないので省く
      if(index !== 0){
        daysData.push(pushData)
      }
      infectedPersonDay = data
    })
    setDayInfectedPerson(daysData)
    setToggle(false)
  }
  

  return (
    <Inner>
      {toggle ?
      <>
        <TypographyTitle
          variant={"h5"}
          align="center"
        >
          感染者数推移（累計）
        </TypographyTitle>
        <OrangeButton label={"累計"} onClick={changeToggle} />
        <OrangeButton label={"日別"} onClick={changeDay} />
        <AreaReChart 
          data={cumulativeInfectedPerson}
          xDataKey={"date"}
          areaDataKey={"npatients"}
          areaName={"感染者数"}
        />
      </>
      :
      <>
        <TypographyTitle
          variant={"h5"}
          align="center"
        >
          感染者数推移（日別）
        </TypographyTitle>
        <OrangeButton label={"累計"} onClick={changeToggle} />
        <OrangeButton label={"日別"} onClick={changeDay} />
        <LineReChart 
          data={dayInfectedPerson}
          xDataKey={"date"}
          lineDataKey={"npatients"}
          lineName={"感染者数"}
          startIndex={dayInfectedPerson.length - 31}
          endIndex={dayInfectedPerson.length - 1}
        />
      </>
      }
      <ReferenceDataLink
        label={"新型コロナウイルス感染症対策"}
        href={"https://corona.go.jp/dashboard/"}
      />
    </Inner>
  );
};

export default InfectedPerson;
