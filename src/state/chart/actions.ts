import { ActionType, createAsyncAction } from 'typesafe-actions';

import { QueueSizeHistoryEntry } from '../../api';

export const fetchQueueSizeHistoryAsyncAction = createAsyncAction(
  '@chart/FETCH_QUEUE_SIZE_HISTORY_REQUEST',
  '@chart/FETCH_QUEUE_SIZE_HISTORY_SUCCESS',
  '@chart/FETCH_QUEUE_SIZE_HISTORY_FAILURE'
)<void, QueueSizeHistoryEntry[], Error>();

export type ChartAction = ActionType<typeof fetchQueueSizeHistoryAsyncAction>;
