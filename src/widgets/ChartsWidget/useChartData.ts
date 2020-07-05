import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  selectDeadLetterQueueHistory,
  selectPayloadSizeHistory,
  selectQueueSizeHistory,
  selectResponseDelayHistory,
} from '../../state/chart';

export const DEFAULT_POINT_INDEX = 1;

export enum TabId {
  avgResponseDelay = 'avgResponseDelay',
  lastQueueSize = 'lastQueueSize',
  avgPayloadSize = 'avgPayloadSize',
  deadLetterQueue = 'deadLetterQueue',
}

export const useChartData = (
  index: number = DEFAULT_POINT_INDEX,
  selectedTabId: TabId
) => {
  const queueSizeHistory = useSelector(selectQueueSizeHistory);
  const responseDelayHistory = useSelector(selectResponseDelayHistory);
  const payloadSizeHistory = useSelector(selectPayloadSizeHistory);
  const deadLetterQueueHistory = useSelector(selectDeadLetterQueueHistory);

  // a little bit tricky
  // what we are doing here, if current tab is avgResponseDelay and index change,
  // it means that user dragging and we should change value only in this selected tab
  // in case if this tab not selected, it will continue to use default index value
  const avgResponseDelay = useMemo<string>(() => {
    const nextIndex =
      selectedTabId === TabId.avgResponseDelay ? index : DEFAULT_POINT_INDEX;

    return (responseDelayHistory[nextIndex]?.value || 0) + 'ms';
  }, [index, responseDelayHistory, selectedTabId]);

  const lastQueueSize = useMemo<string>(() => {
    const nextIndex =
      selectedTabId === TabId.lastQueueSize ? index : DEFAULT_POINT_INDEX;

    return String(queueSizeHistory[nextIndex]?.value || 0);
  }, [index, queueSizeHistory, selectedTabId]);

  const payloadSize = useMemo<string>(() => {
    const nextIndex =
      selectedTabId === TabId.avgPayloadSize ? index : DEFAULT_POINT_INDEX;
    return String(payloadSizeHistory[nextIndex]?.value || 0) + 'kb';
  }, [index, payloadSizeHistory, selectedTabId]);

  const deadLetterQueue = useMemo<string>(() => {
    const nextIndex =
      selectedTabId === TabId.deadLetterQueue ? index : DEFAULT_POINT_INDEX;
    return String(deadLetterQueueHistory[nextIndex]?.value || 0);
  }, [deadLetterQueueHistory, index, selectedTabId]);

  return {
    queueSizeHistory,
    responseDelayHistory,
    payloadSizeHistory,
    deadLetterQueueHistory,

    avgResponseDelay,
    lastQueueSize,
    payloadSize,
    deadLetterQueue,
  };
};
