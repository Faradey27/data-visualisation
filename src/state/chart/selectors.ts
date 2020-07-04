import { RootState } from '../reducer';

export const selectQueueSizeHistory = (state: RootState) =>
  state.chart.queueSizeHistory;
export const selectQueueSizeHistoryRequestState = (state: RootState) =>
  state.chart.queueSizeHistoryRequestState;
