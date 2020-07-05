import React, { memo } from 'react';
import {
  Area,
  AreaChart,
  Brush,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';

import theme from '../../../theme.scss';

/*
  This component required in order to be able to have brush tool in chart header.
  Recharts allow to put it only in footer, so to overcome this, we created 2 separate charts,
  in one Brush is hidden(height: 0.001) and in another visible + we added syncId on charts.
*/

interface BrushTravellerParams {
  x: number;
  y: number;
  height: number;
}

// TODO rotate them properly
const renderBrushTraveller = ({
  x,
  y,
  height,
}: BrushTravellerParams): SVGElement => {
  // border radius of traveller
  const radius = 2;
  // we want travellerHeight to be 1/3 of QueueSizeBarBrushChart height + we need to extract radius from top and bottom
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

interface QueueSizeBarBrushChartProps {
  startIndex: number;
  endIndex: number;
  data: any[];
  dataKey: string;
  areaDataKey: string;
  syncID?: string;
  onBrushWindowChange: ({
    startIndex,
    endIndex,
  }: {
    startIndex: number;
    endIndex: number;
  }) => void;
}

// negative margin to hide stroke at left and right
const chartMargin = {
  right: -1,
  left: -1,
};

const QueueSizeBarBrushChart: React.FC<QueueSizeBarBrushChartProps> = ({
  startIndex,
  endIndex,
  data,
  dataKey,
  areaDataKey,
  syncID,
  onBrushWindowChange,
}) => {
  return (
    <ResponsiveContainer width="100%" height={theme.space * 10}>
      <ComposedChart data={data} margin={chartMargin} syncId={syncID}>
        <Brush
          dataKey={dataKey}
          height={theme.space * 10}
          startIndex={startIndex}
          endIndex={endIndex}
          stroke={theme.borderColor}
          y={-1} /* -1 to hide stroke at top */
          travellerWidth={3}
          traveller={renderBrushTraveller}
          alwaysShowText
          padding={{ top: theme.space * 2 }}
          onChange={onBrushWindowChange as any}
        >
          <AreaChart>
            <defs>
              <linearGradient id={areaDataKey} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={theme.borderColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={theme.textSecondaryColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={areaDataKey}
              stroke={theme.borderColor}
              fill={`url(#${areaDataKey})`}
            />
          </AreaChart>
        </Brush>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default memo(QueueSizeBarBrushChart);
