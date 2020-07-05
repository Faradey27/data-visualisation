import React from 'react';
import ReactDOM from 'react-dom';

import { QueueSizeHistoryEntry } from '../../../api';
import DragPoint from './DragPoint';
import PinnedPoint from './PinnedPoint';

export const QUEUE_CHART_SYNC_ID = 'line-with-bar';
export const QUEUE_CHART_ROOT_ID = 'queue-chart-root';

// we put "any" to overcome bug in typings
// TODO properly overide types
export const PINNED_POINT_LINE_PROPS: any = {
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

// we put "any" to overcome bug in typings
// TODO properly overide types
export const DRAG_POINT_LINE_PROPS: any = {
  label: (props: any) => {
    const chartRootNode = document.getElementById(QUEUE_CHART_ROOT_ID);

    if (!chartRootNode) {
      return null;
    }

    return ReactDOM.createPortal(
      <DragPoint x={props.viewBox.x} y={props.viewBox.y} />,
      chartRootNode
    );
  },
};

export const formatDateTick = (tick: number) => {
  return new Date(tick).getHours() + ':00';
};

export const gradientOffset = (
  originalData: QueueSizeHistoryEntry[],
  normalizeNumber: number = 5000
) => {
  const data = originalData.map((item) => ({
    ...item,
    value: item.value - normalizeNumber,
  }));

  const dataMax = Math.max(...data.map((i) => i.value));
  const dataMin = Math.min(...data.map((i) => i.value));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};
