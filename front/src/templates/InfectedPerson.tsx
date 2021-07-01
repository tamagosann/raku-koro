import React, { useState } from "react";
import { Inner } from "../components/inner";
import { useAppSelector } from '../app/hooks';
import { selectTotalCorona } from '../features/graphs/totalCoronaSlice';
import { OrangeButton } from "../components/atoms";

// マテリアルUI
import { Button, Typography } from "@material-ui/core";
import { AreaReChart, LineReChart } from "../components/organisms";

interface Data {
  date: string;
  npatients: number;
  adpatients : number;
}

const InfectedPerson = () => {
  const totalCorona = useAppSelector(selectTotalCorona)
  const cumulativeInfectedPerson: Array<Data> = totalCorona.data
  const [dayInfectedPerson, setDayInfectedPerson] = useState<Array<Data>>([])
  const [toggle, setToggle] = useState<boolean>(true)

  // 累計への切り替え
  const changeToggle = (): void => {
    setToggle(true)
  }

  // 日別への切り替え
  const changeDay = (): void => {
    let daysData: Array<Data> = []
    let count:number = 0
    let infectedPersonDay:Data = {
      date: '',
      npatients: 0,
      adpatients: 0
    }
    cumulativeInfectedPerson.forEach((data, index) => {
      count = data.npatients - infectedPersonDay.npatients
      let pushData:Data = {
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
      <OrangeButton label={"累計"} onClick={changeToggle} />
      <OrangeButton label={"日別"} onClick={changeDay} />
      {toggle ?
      <>
        <Typography variant="h5" align="center">感染者数推移（累計）</Typography>
        <AreaReChart 
          data={cumulativeInfectedPerson}
          xDataKey={"date"}
          areaDataKey={"npatients"}
          areaName={"感染者数"}
        />
      </>
      :
      <>
        <Typography variant="h5" align="center">感染者数推移（日別）</Typography>
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
    </Inner>
  );
};

export default InfectedPerson;
