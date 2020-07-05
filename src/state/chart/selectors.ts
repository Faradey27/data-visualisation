import { RootState } from '../reducer';

export const selectQueueSizeHistory = (state: RootState) =>
  state.chart.queueSizeHistory;

export const selectQueueSizeHistoryRequestState = (state: RootState) =>
  state.chart.queueSizeHistoryRequestState;

export const selectResponseDelayHistory = (state: RootState) =>
  state.chart.responseDelayHistory;

export const selectResponseDelayHistoryRequestState = (state: RootState) =>
  state.chart.responseDelayHistoryRequestState;

export const selectPayloadSizeHistory = (state: RootState) =>
  state.chart.payloadSizeHistory;

export const selectPayloadSizeHistoryRequestState = (state: RootState) =>
  state.chart.payloadSizeHistoryRequestState;

export const selectDeadLetterQueueHistory = (state: RootState) =>
  state.chart.deadLetterQueueHistory;

export const selectDeadLetterQueueHistoryRequestState = (state: RootState) =>
  state.chart.deadLetterQueueHistoryRequestState;
