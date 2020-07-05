import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Area,
  Bar,
  Brush,
  Cell,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { QueueSizeHistoryEntry } from '../../../api';
import theme from '../../../theme.scss';
import { DEFAULT_POINT_INDEX } from '../useChartData';
import BrushChart from './QueueSizeBrushChart';
import {
  DRAG_POINT_LINE_PROPS,
  formatDateTick,
  gradientOffset,
  PINNED_POINT_LINE_PROPS,
  QUEUE_CHART_ROOT_ID,
  QUEUE_CHART_SYNC_ID,
} from './utils';
import XAxisTick from './XAxisTick';
import YAxisTick from './YAxisTick';

// TODO in real life here should be smth smater
const yAxisDomain = [0, (dataMax: number) => Math.min(8000, dataMax + 1000)];
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

interface QueueChartsProps {
  pinnedPointIndex: number;
  data: QueueSizeHistoryEntry[];
  brushDataKey: string;
  areaDataKey: string;
  barDataKey: string;
  selectedPointIndex?: number;
  onChangeSelectedPointIndex: (index: number) => void;
}

const QueueCharts: React.FC<QueueChartsProps> = ({
  pinnedPointIndex = 120,
  selectedPointIndex,
  data,
  brushDataKey,
  areaDataKey,
  barDataKey,
  onChangeSelectedPointIndex,
}) => {
  const [startIndex, setStartIndex] = useState(110);
  const [endIndex, setendIndex] = useState(150);
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
    startIndex,
    endIndex,
  ]);

  const off = useMemo(() => gradientOffset(memoizedData), [memoizedData]);

  const handleBrushWindowChange = useCallback(({ startIndex, endIndex }) => {
    setStartIndex(startIndex);
    setendIndex(endIndex);
  }, []);

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
          <ComposedChart
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
              domain={yAxisDomain}
              axisLine={false}
              tick={YAxisTick}
            />
            <Area
              type="monotone"
              dataKey={areaDataKey}
              stroke="url(#splitColorStroke)"
              fill="url(#splitColor)"
            />
            <Bar dataKey={barDataKey} barSize={4}>
              {memoizedData.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.pending > 0 ? theme.red : theme.primaryColor}
                  />
                );
              })}
            </Bar>
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor={'#feebed'} stopOpacity={1} />
                <stop offset={off} stopColor="#f9f7fd" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="splitColorStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor={theme.red} stopOpacity={1} />
                <stop
                  offset={off}
                  stopColor={theme.primaryColor}
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default memo(QueueCharts);
