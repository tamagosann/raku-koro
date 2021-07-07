import React, { FC } from 'react';
import {
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from 'recharts';

// 型のインポート
import { Data } from '../../features/graphs/totalCoronaSlice';
import { DethData } from '../../features/graphs/totalDeathSlice';

interface Props {
  data: Data[] | DethData[];
  xDataKey: string;
  areaDataKey: string;
  areaName: string;
}

const AreaReChart: FC<Props> = ({ data, xDataKey, areaDataKey, areaName }) => {
  return (
    <ResponsiveContainer width='100%' height='100%' minHeight={400}>
      <AreaChart data={data}>
        <XAxis dataKey={xDataKey} tick={{ fontSize: '.6rem' }} />
        <YAxis tick={{ fontSize: '.6rem' }} />
        <Tooltip />
        <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
        <Legend verticalAlign='top' stroke='#fd7e00' />
        <Area
          type='monotone'
          dataKey={areaDataKey}
          name={areaName}
          stroke='#fd7e00'
          fill='#fd7e00'
          strokeWidth={3}
        />
        <Brush dataKey={xDataKey} stroke='#fd7e00' />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaReChart;
