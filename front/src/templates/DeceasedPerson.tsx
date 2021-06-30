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
import { selectTotalDeth } from '../features/graphs/totalDethSlice';

interface Data {
  date: string;
  ndeaths: number;
}

const DeceasedPerson = () => {
  const totalDeth = useAppSelector(selectTotalDeth)
  const dethPerson: Array<Data> = totalDeth.data
  const [dayDethPerson, setDayDethPerson] = useState<Array<Data>>([])
  const [toggle, setToggle] = useState<boolean>(true)

  // 累計への切り替え
  const changeToggle = (): void => {
    setToggle(true)
  }
  
  // 日別への切り替え
  const changeDay = (): void => {
    let daysData: Array<Data> = []
    let count:number = 0
    let dethPersonDay:Data = {
      date: '',
      ndeaths: 0
    }
    dethPerson.forEach((data, index) => {
      count = data.ndeaths - dethPersonDay.ndeaths
      let pushData:Data = {
        date: data.date,
        ndeaths: count
      }
      // １つ目は引く値がないので省く
      if(index !== 0){
        daysData.push(pushData)
      }
      dethPersonDay = data
    })
    setDayDethPerson(daysData)
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
        <Typography variant="h5" align="center">死亡者数推移（累計）</Typography>
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
          <AreaChart data={dethPerson}>
            <XAxis dataKey="date" tick={{ fontSize: '.6rem' }}/>
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Legend verticalAlign="top"/>
            <Area
              type="monotone"
              dataKey="ndeaths"
              name="死亡者数"
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
        <Typography variant="h5" align="center">死亡者数推移（日別）</Typography>
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <LineChart data={dayDethPerson}>
          <XAxis dataKey="date" tick={{ fontSize: '.6rem' }}/>
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Legend verticalAlign="top"/>
          <Line
            dataKey="ndeaths"
            name="死亡者数"
            stroke="#8884d8"
            fill="#8884b8"
            strokeWidth={3}
          />
          <Brush
            dataKey="date"
            stroke="#8884d8"
            startIndex={dayDethPerson.length - 31}
            endIndex={dayDethPerson.length - 1}
          />
          </LineChart>
        </ResponsiveContainer>
      </>
      }
    </Inner>
  );
};

export default DeceasedPerson;
