import React from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Inner } from "../components/inner";

const Graph2 = () => {
  const data = [
    { date: "2020-02-02", weight: 60 },
    { date: "2020-02-02", weight: 60 },
    { date: "2020-02-02", weight: 60 },
    { date: "2020-02-02", weight: 60 },
    { date: "2020-02-02", weight: 60 },
  ];

  return (
    <Inner>
      <ResponsiveContainer width="100%" height="40%" minHeight={400}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[40, 90]} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <ReferenceLine
            y={80}
            label="開始体重"
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={60}
            label="目標体重"
            stroke="blue"
            strokeDasharray="3 3"
          />
          <Brush dataKey="date" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Inner>
  );
};

export default Graph2;
