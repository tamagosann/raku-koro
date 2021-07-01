import React, { useState } from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Inner } from "../components/inner";
import { Button, Typography } from "@material-ui/core";
import { useAppSelector } from '../app/hooks';
import { selectTotalCorona } from '../features/graphs/totalCoronaSlice';

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
      <Typography>
        <Button variant="contained" style={{color: "#000"}} onClick={changeToggle}>累計</Button>
        <Button variant="contained" style={{color: "#000"}} onClick={changeDay}>日別</Button>
      </Typography>
      {toggle ?
      <>
        <Typography variant="h5" align="center">感染者数推移（累計）</Typography>
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
          <AreaChart data={cumulativeInfectedPerson}>
            <XAxis dataKey="date" tick={{ fontSize: '.6rem' }}/>
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Legend verticalAlign="top"/>
            <Area
              type="monotone"
              dataKey="npatients"
              name="感染者数"
              stroke="#8884d8"
              fill="#8884b8"
              strokeWidth={3}
            />
            <Brush dataKey="date" stroke="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </>
      :
      <>
        <Typography variant="h5" align="center">感染者数推移（日別）</Typography>
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
          <LineChart data={dayInfectedPerson}>
            <XAxis dataKey="date" tick={{ fontSize: '.6rem' }}/>
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Legend verticalAlign="top"/>
            <Line
              dataKey="npatients"
              name="感染者数"
              stroke="#8884d8"
              fill="#8884b8"
              strokeWidth={3}
            />
            <Brush
              dataKey="date"
              stroke="#8884d8"
              startIndex={dayInfectedPerson.length - 31}
              endIndex={dayInfectedPerson.length - 1}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    }
    </Inner>
  );
};

export default InfectedPerson;
