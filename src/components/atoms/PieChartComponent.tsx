import React,{ FC} from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts';
  // 型
import { Data } from '../../features/graphs/bedOccupancyRateSlice';

  const COLORS = ['#bdc3c7', '#ff2b2b'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any): JSX.Element => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  interface Props {
    element: Data;
    data: {
      name: string;
      value: number;
    }[];
  }


export const PieChartComponent: FC<Props>= ({ element, data }: Props) => {
    return(
        <ResponsiveContainer width="99%" height={400}>
            <PieChart style={{ margin: '0 auto' }}>
              <Pie
                startAngle={-270}
                data={data}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                stroke="#fd7e00"
                verticalAlign="top"
                wrapperStyle={{ lineHeight: '40px' }}
                fill="#fd7e00"
                payload={[
                  {
                    value: `推定病床残数 （${data[0].value.toLocaleString()} 床）`,
                    color: '#bdc3c7',
                  },
                  {
                    value: `入院者数 （${data[1].value.toLocaleString()} 人）`,
                    color: '#ff2b2b',
                  },
                ]}
              />
              <Tooltip
                formatter={(value: any, name: any, props: any) => {
                  console.log(value, name, props);
                  if (name === '推定病床残数') {
                    return `${value} 床`;
                  } else {
                    return `${value} 人`;
                  }
                }}
              />
            </PieChart>
          </ResponsiveContainer>
    )
}