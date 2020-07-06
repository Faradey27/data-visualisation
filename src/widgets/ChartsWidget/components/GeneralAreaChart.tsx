import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Brush,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import theme from '../../../theme.scss';
import { DEFAULT_POINT_INDEX } from '../useChartData';
import BrushChart from './QueueSizeBrushChart';
import {
  DRAG_POINT_LINE_PROPS,
  formatDateTick,
  PINNED_POINT_LINE_PROPS,
  QUEUE_CHART_ROOT_ID,
  QUEUE_CHART_SYNC_ID,
} from './utils';
import XAxisTick from './XAxisTick';
import YAxisTick from './YAxisTick';

// TODO reduce code duplication with QueueChart

const yAxisPadding = { bottom: 60 };

// we put "any" to overcome bug in typings
// TODO properly overide types
const axisStyleProps: any = {
  stroke: theme.borderColor,
};

const chartMargin = {
  top: theme.space * 2,
  left: -theme.space * 3,
};

interface GeneralAreaChartProps {
  startIndex: number;
  endIndex: number;
  pinnedPointIndex: number;
  data: { timestamp: number; value: number }[];
  brushDataKey: string;
  areaDataKey: string;
  selectedPointIndex?: number;
  onChangeEndIndex: (index: number) => void;
  onChangeStartIndex: (index: number) => void;
  onChangeSelectedPointIndex: (index: number) => void;
}

const GeneralAreaChart: React.FC<GeneralAreaChartProps> = ({
  pinnedPointIndex = 120,
  selectedPointIndex,
  data,
  brushDataKey,
  areaDataKey,
  startIndex,
  endIndex,
  onChangeEndIndex,
  onChangeStartIndex,
  onChangeSelectedPointIndex,
}) => {
  const [isDragging, setDragState] = useState(false);

  const handleStartDrag = useCallback(
    (e) => {
      setDragState(true);
      if (e && e.activeTooltipIndex) {
        onChangeSelectedPointIndex(e.activeTooltipIndex);
      }
    },
    [onChangeSelectedPointIndex]
  );

  const handleStopDrag = useCallback(
    (e) => {
      setDragState(false);
      onChangeSelectedPointIndex(DEFAULT_POINT_INDEX);
    },
    [onChangeSelectedPointIndex]
  );

  const handleDrag = useCallback(
    (e) => {
      if (isDragging && e && e.activeTooltipIndex) {
        onChangeSelectedPointIndex(e.activeTooltipIndex);
      }
    },
    [isDragging, onChangeSelectedPointIndex]
  );

  const memoizedData = useMemo(() => data.slice(startIndex, endIndex), [
    data,
    endIndex,
    startIndex,
  ]);

  const handleBrushWindowChange = useCallback(
    ({ startIndex, endIndex }) => {
      onChangeEndIndex(endIndex);
      onChangeStartIndex(startIndex);
    },
    [onChangeEndIndex, onChangeStartIndex]
  );

  return (
    <>
      <BrushChart
        data={data}
        startIndex={startIndex}
        endIndex={endIndex}
        dataKey={brushDataKey}
        areaDataKey={areaDataKey}
        syncID={QUEUE_CHART_SYNC_ID}
        onBrushWindowChange={handleBrushWindowChange}
      />
      <div id={QUEUE_CHART_ROOT_ID}>
        <ResponsiveContainer width="100%" height={theme.space * 30}>
          <AreaChart
            data={data}
            margin={chartMargin}
            syncId={QUEUE_CHART_SYNC_ID}
            onMouseDown={handleStartDrag}
            onMouseMove={handleDrag}
            onMouseUp={handleStopDrag}
          >
            <Brush
              dataKey={brushDataKey}
              startIndex={startIndex}
              endIndex={endIndex}
              width={0}
              height={0.00001}
            />
            <ReferenceLine y={1} stroke={theme.borderColor} />
            {data[pinnedPointIndex] ? (
              <ReferenceLine
                className="pinnedPoint"
                x={data[pinnedPointIndex]?.timestamp}
                stroke={theme.primaryColor}
                strokeDasharray={'1, 1'}
                {...PINNED_POINT_LINE_PROPS}
              />
            ) : null}
            {isDragging &&
            selectedPointIndex &&
            memoizedData[selectedPointIndex] ? (
              <ReferenceLine
                className="pinnedPoint"
                x={memoizedData[selectedPointIndex]?.timestamp}
                stroke={theme.primaryColor}
                {...DRAG_POINT_LINE_PROPS}
              />
            ) : null}
            <XAxis
              {...axisStyleProps}
              dataKey="timestamp"
              tickSize={theme.space * 8}
              axisLine={false}
              tickFormatter={formatDateTick}
              tick={XAxisTick}
            />
            <YAxis
              {...axisStyleProps}
              dataKey={areaDataKey}
              type="number"
              padding={yAxisPadding}
              axisLine={false}
              tick={YAxisTick}
            />
            <defs>
              <linearGradient
                id="general-area-chart"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={theme.primaryColor}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="#faf8fe" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={areaDataKey}
              stroke={theme.borderColor}
              fill={`url(#general-area-chart)`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default memo(GeneralAreaChart);
