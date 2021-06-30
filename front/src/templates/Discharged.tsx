import React from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Inner } from "../components/inner";
import { Button, Typography } from "@material-ui/core";


const InfectedPerson = () => {
  const data = [
    { date: "2021-06-28", 感染者数: 635 },
    { date: "2021-06-29", 感染者数: 700 },
    { date: "2021-06-30", 感染者数: 810 },
    { date: "2021-07-01", 感染者数: 943 },
    { date: "2021-07-02", 感染者数: 1023 },
    { date: "2021-07-03", 感染者数: 788 },
    { date: "2021-07-04", 感染者数: 999 },
  ];

  return (
    <Inner>
      <Typography variant="h5" align="center">感染者数推移</Typography>
      <Typography>
        <Button variant="contained" style={{color: "#000"}}>累計</Button>
        <Button variant="contained" style={{color: "#000"}}>日別</Button>
      </Typography>
      <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: '.6rem' }}/>
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Legend verticalAlign="top"/>
          <Line
            type="monotone"
            dataKey="感染者数"
            name="感染者数"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <Brush dataKey="date" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Inner>
  );
};

export default InfectedPerson;
