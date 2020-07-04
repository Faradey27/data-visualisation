import { ActionType, createAsyncAction } from 'typesafe-actions';

import {
  AlertHistoryEntry,
  InsightHistoryEntry,
  ResourceHistoryEntry,
} from '../../api';

export const fetchResourcesDataAsyncAction = createAsyncAction(
  '@widgets/FETCH_RESOURCES_DATA_REQUEST',
  '@widgets/FETCH_RESOURCES_DATA_SUCCESS',
  '@widgets/FETCH_RESOURCES_DATA_FAILURE'
)<void, ResourceHistoryEntry[], Error>();

export const fetchInsightsDataAsyncAction = createAsyncAction(
  '@widgets/FETCH_INSIGHTS_DATA_REQUEST',
  '@widgets/FETCH_INSIGHTS_DATA_SUCCESS',
  '@widgets/FETCH_INSIGHTS_DATA_FAILURE'
)<void, InsightHistoryEntry[], Error>();

export const fetchAlertsDataAsyncAction = createAsyncAction(
  '@widgets/FETCH_ALERTS_DATA_REQUEST',
  '@widgets/FETCH_ALERTS_DATA_SUCCESS',
  '@widgets/FETCH_ALERTS_DATA_FAILURE'
)<void, AlertHistoryEntry[], Error>();

export type WidgetsAction =
  | ActionType<typeof fetchResourcesDataAsyncAction>
  | ActionType<typeof fetchInsightsDataAsyncAction>
  | ActionType<typeof fetchAlertsDataAsyncAction>;
