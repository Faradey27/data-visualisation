import { ActionType, createAsyncAction } from 'typesafe-actions';

import {
  DeadLetterQueueHistoryEntry,
  PayloadSizeHistoryEntry,
  QueueSizeHistoryEntry,
  ResponseDelayHistoryEntry,
} from '../../api';

export const fetchQueueSizeHistoryAsyncAction = createAsyncAction(
  '@chart/FETCH_QUEUE_SIZE_HISTORY_REQUEST',
  '@chart/FETCH_QUEUE_SIZE_HISTORY_SUCCESS',
  '@chart/FETCH_QUEUE_SIZE_HISTORY_FAILURE'
)<void, QueueSizeHistoryEntry[], Error>();

export const fetchResponseDelayHistoryAsyncAction = createAsyncAction(
  '@chart/FETCH_RESPONSE_DELAY_HISTORY_REQUEST',
  '@chart/FETCH_RESPONSE_DELAY_HISTORY_SUCCESS',
  '@chart/FETCH_RESPONSE_DELAY_HISTORY_FAILURE'
)<void, ResponseDelayHistoryEntry[], Error>();

export const fetchPayloadSizeHistoryAsyncAction = createAsyncAction(
  '@chart/FETCH_PAYLOAD_SIZE_HISTORY_REQUEST',
  '@chart/FETCH_PAYLOAD_SIZE_HISTORY_SUCCESS',
  '@chart/FETCH_PAYLOAD_SIZE_HISTORY_FAILURE'
)<void, PayloadSizeHistoryEntry[], Error>();

export const fetchDeadLetterQueueHistoryAsyncAction = createAsyncAction(
  '@chart/FETCH_DEAD_LETTER_QUEUE_HISTORY_REQUEST',
  '@chart/FETCH_DEAD_LETTER_QUEUE_HISTORY_SUCCESS',
  '@chart/FETCH_DEAD_LETTER_QUEUE_HISTORY_FAILURE'
)<void, DeadLetterQueueHistoryEntry[], Error>();

export type ChartAction =
  | ActionType<typeof fetchQueueSizeHistoryAsyncAction>
  | ActionType<typeof fetchResponseDelayHistoryAsyncAction>
  | ActionType<typeof fetchPayloadSizeHistoryAsyncAction>
  | ActionType<typeof fetchDeadLetterQueueHistoryAsyncAction>;
