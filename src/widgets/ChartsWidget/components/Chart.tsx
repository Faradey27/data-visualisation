import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import theme from '../../../theme.scss';

interface BrushTravellerParams {
  x: number;
  y: number;
  height: number;
}

const renderBrushTraveller = ({
  x,
  y,
  height,
}: BrushTravellerParams): SVGElement => {
  // border radius of traveller
  const radius = 2;
  // we want travellerHeight to be 1/3 of BrushChart height + we need to extract radius from top and bottom
  const travellerHeight = height / 3 - radius * 2;
  // we want traveller to be 3px width, so travellerWidth + radius from top + radius from bottom will give us what we want
  const travellerWidth = 1;

  // we doing "as unknown as SVGElement" to properly set types, as library has bug their
  return ((
    <path
      d={`M${x},${y + travellerHeight + radius * 2}
        h${travellerWidth}
        q${radius},0 ${radius},${radius}
        v${travellerHeight}
        q0,${radius} -${radius},${radius}
        h-${travellerWidth}
        z
      `}
      fill={theme.primaryColor}
    />
  ) as unknown) as SVGElement;
};

interface ChartProps {
  data: any;
  brushDataKey: string;
  areaDataKey: string;
  barDataKey: string;
}

const formatDateTick = (tick: number) => {
  return new Date(tick).getHours() + ':00';
};

const Chart: React.FC<ChartProps> = ({
  data,
  brushDataKey,
  areaDataKey,
  barDataKey,
}) => {
  const off = () => {
    const dataMax = Math.max(...data.map((i: any) => i.value));
    const dataMin = Math.min(...data.map((i: any) => i.value));
    console.log(dataMax, dataMin);
    // if (dataMax <= 3) {
    //   return 0;
    // }
    // if (dataMin >= 7) {
    //   return 1;
    // }

    return 0.1;
  };
  return (
    <>
      <ResponsiveContainer width="100%" height={theme.space * 9}>
        <ComposedChart
          data={data}
          margin={{
            right: -1,
            left: -1,
          }}
          syncId="anyId"
        >
          <Brush
            dataKey={brushDataKey}
            height={theme.space * 9}
            startIndex={2}
            endIndex={25}
            stroke="#f1f1f1"
            y={-1}
            travellerWidth={3}
            traveller={renderBrushTraveller}
            alwaysShowText
          >
            <AreaChart>
              <Area
                type="monotone"
                dataKey={areaDataKey}
                stroke="#f1f1f1"
                fill="#f8f8f8"
              />
            </AreaChart>
          </Brush>
        </ComposedChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={theme.space * 31}>
        <ComposedChart
          data={data}
          margin={{
            top: theme.space * 2,
            left: theme.space * 1,
          }}
          syncId="anyId"
        >
          <Brush
            dataKey={brushDataKey}
            startIndex={2}
            endIndex={25}
            stroke="#f1f1f1"
            y={-1}
            width={0}
            height={0.00001}
            travellerWidth={3}
            traveller={renderBrushTraveller}
            alwaysShowText
          />
          <XAxis dataKey="date" tickFormatter={formatDateTick} />
          <YAxis dataKey={areaDataKey} axisLine={false} unit="K" />
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
          <Bar dataKey={barDataKey} barSize={4}>
            {data.map((entry: any, index: any) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.usageValue > 0 ? '#2ca02c' : '#d62728'}
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
