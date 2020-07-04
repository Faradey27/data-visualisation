import { RootState } from '../reducer';

export const selectResourceHistory = (state: RootState) =>
  state.widgets.resourceHistory;
export const selectResourceHistoryRequestState = (state: RootState) =>
  state.widgets.resourceHistoryRequestState;

export const selectInsightsHistory = (state: RootState) =>
  state.widgets.insightsHistory;
export const selectInsightsHistoryRequestState = (state: RootState) =>
  state.widgets.insightsHistoryRequestState;

export const selectAlertsHistory = (state: RootState) =>
  state.widgets.alertsHistory;
export const selectAlertsHistoryRequestState = (state: RootState) =>
  state.widgets.alertsHistoryRequestState;
