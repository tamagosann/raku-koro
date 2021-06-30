import React from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
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

const DeceasedPerson = () => {
  const totalCorona = useAppSelector(selectTotalCorona)
  const cumulativeInfectedPerson: Array<Data> = totalCorona.data


  return (
    <Inner>
      <Typography variant="h5" align="center">死亡者数推移（累計）</Typography>
      {/* <Typography>
        <Button variant="contained" style={{color: "#000"}}>累計</Button>
        <Button variant="contained" style={{color: "#000"}}>日別</Button>
      </Typography> */}
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
            name="死亡者数"
            stroke="#8884d8"
            fill="#8884b8"
            strokeWidth={3}
          />
          <Brush dataKey="date" stroke="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Inner>
  );
};

export default DeceasedPerson;
