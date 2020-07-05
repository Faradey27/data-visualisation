import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  Cell,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import theme from '../../../theme.scss';
import BrushChart from './BrushChart';

interface ChartProps {
  data: any;
  brushDataKey: string;
  areaDataKey: string;
  barDataKey: string;
}

const formatDateTick = (tick: number) => {
  return new Date(tick).getHours() + ':00';
};

// function CustomXAxisLabel(props: any) {
//   console.log(props);
//   return (
//     <line
//       {...tickLineProps}
//       {...lineCoord}
//       className={classNames(
//         'recharts-cartesian-axis-tick-line',
//         _.get(tickLine, 'className')
//       )}
//     />
//   );
// }

// we put "any" to overcome bug in typings
// TODO properly overide types
const axisStyleProps: any = {
  stroke: theme.borderColor,
  tick: { fontSize: 12 },
};

const chartMargin = {
  top: theme.space * 2,
  left: -theme.space * 2,
};

const Chart: React.FC<ChartProps> = ({
  data,
  brushDataKey,
  areaDataKey,
  barDataKey,
}) => {
  const off = () => {
    return 0.1;
  };
  // top = 0.25, body = 0.48, bottom = 0.27
  const startIndex = 110;
  const endIndex = 151;

  return (
    <>
      <BrushChart
        data={data}
        startIndex={startIndex}
        endIndex={endIndex}
        dataKey={brushDataKey}
        areaDataKey={areaDataKey}
      />
      <ResponsiveContainer width="100%" height={theme.space * 30}>
        <ComposedChart data={data} margin={chartMargin} syncId="anyId">
          <Brush
            dataKey={brushDataKey}
            startIndex={startIndex}
            endIndex={endIndex}
            width={0}
            height={0.00001}
          />
          <ReferenceLine y={0} stroke="grey" />
          <XAxis
            {...axisStyleProps}
            tick={{ fontSize: 12 }}
            dataKey="date"
            tickSize={56}
            axisLine={false}
            tickFormatter={formatDateTick}
            // tick={CustomXAxisLabel as any}
          />
          <YAxis
            {...axisStyleProps}
            dataKey={areaDataKey}
            type="number"
            padding={{ bottom: 60 }}
            domain={[0, 8000]}
            axisLine={false}
            unit="K"
          />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off()} stopColor={'#feebed'} stopOpacity={1} />
              <stop offset={off()} stopColor="#f8f8f8" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="splitColorStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off()} stopColor={'red'} stopOpacity={1} />
              <stop
                offset={off()}
                stopColor={theme.primaryColor}
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={areaDataKey}
            stroke="url(#splitColorStroke)"
            fill="url(#splitColor)"
          />
          <Bar dataKey={barDataKey} barSize={4} fill="blue">
            {data.map((item: any) => {
              // console.log(item);
              return (
                <Cell
                  key={item.date}
                  fill={item.pending <= 0 ? 'blue' : 'red'}
                />
              );
            })}
          </Bar>
          {/* <Tooltip />
          <ReferenceLine y={1} x={5} stroke="blue" strokeDasharray="0.5 0.5" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
