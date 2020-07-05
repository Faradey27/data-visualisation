import React, { memo, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
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
import PinnedPoint from './PinnedPoint';
import BrushChart from './QueueSizeBrushChart';
import XAxisTick from './XAxisTick';
import YAxisTick from './YAxisTick';

interface QueueChartsProps {
  data: QueueSizeHistoryEntry[];
  brushDataKey: string;
  areaDataKey: string;
  barDataKey: string;
}

const formatDateTick = (tick: number) => {
  return new Date(tick).getHours() + ':00';
};

// TODO in real life here should be smth smater
const yAxisDomain = [0, (dataMax: number) => Math.min(8000, dataMax + 1000)];

// we put "any" to overcome bug in typings
// TODO properly overide types
const axisStyleProps: any = {
  stroke: theme.borderColor,
};

const yAxisPadding = { bottom: 60 };

// we put "any" to overcome bug in typings
// TODO properly overide types
const PINNED_POINT_LINE_PROPS: any = {
  label: (props: any) => {
    const chartRootNode = document.getElementById(QUEUE_CHART_ROOT_ID);

    if (!chartRootNode) {
      return null;
    }

    return ReactDOM.createPortal(
      <PinnedPoint x={props.viewBox.x} y={props.viewBox.y} />,
      chartRootNode
    );
  },
};

const chartMargin = {
  top: theme.space * 2,
  left: -theme.space * 3,
};

const syncID = 'line-with-bar';
const QUEUE_CHART_ROOT_ID = 'queue-chart-root';

// TODO this data should come from server;
const pinnedPointIndex = 120;

const QueueCharts: React.FC<QueueChartsProps> = ({
  data,
  brushDataKey,
  areaDataKey,
  barDataKey,
}) => {
  const [startIndex, setStartIndex] = useState(110);
  const [endIndex, setendIndex] = useState(150);

  const memoizedData = useMemo(() => data.slice(startIndex, endIndex), [
    data,
    startIndex,
    endIndex,
  ]);

  const off = () => {
    return 0.1;
  };

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
        syncID={syncID}
        onBrushWindowChange={handleBrushWindowChange}
      />
      <div id={QUEUE_CHART_ROOT_ID}>
        <ResponsiveContainer width="100%" height={theme.space * 30}>
          <ComposedChart data={data} margin={chartMargin} syncId={syncID}>
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
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default memo(QueueCharts);
