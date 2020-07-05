import { getType } from 'typesafe-actions';

import {
  AlertHistoryEntry,
  InsightHistoryEntry,
  RequestState,
  ResourceHistoryEntry,
} from '../../api/types';
import {
  fetchAlertsDataAsyncAction,
  fetchInsightsDataAsyncAction,
  fetchResourcesDataAsyncAction,
  WidgetsAction,
} from './actions';

export interface WidgetsState {
  resourceHistory: ResourceHistoryEntry[];
  insightsHistory: InsightHistoryEntry[];
  alertsHistory: AlertHistoryEntry[];
  resourceHistoryRequestState: RequestState;
  insightsHistoryRequestState: RequestState;
  alertsHistoryRequestState: RequestState;
}

const initialState: WidgetsState = {
  resourceHistory: [],
  insightsHistory: [],
  alertsHistory: [],
  resourceHistoryRequestState: RequestState.unset,
  insightsHistoryRequestState: RequestState.unset,
  alertsHistoryRequestState: RequestState.unset,
};

export const widgetsReducer = (state = initialState, action: WidgetsAction) => {
  switch (action.type) {
    case getType(fetchResourcesDataAsyncAction.request): {
      return {
        ...state,
        resourceHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchResourcesDataAsyncAction.success): {
      return {
        ...state,
        resourceHistory: action.payload,
        resourceHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchResourcesDataAsyncAction.failure): {
      return {
        ...state,
        resourceHistoryRequestState: RequestState.failure,
      };
    }

    case getType(fetchInsightsDataAsyncAction.request): {
      return {
        ...state,
        insightsHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchInsightsDataAsyncAction.success): {
      return {
        ...state,
        insightsHistory: action.payload,
        insightsHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchInsightsDataAsyncAction.failure): {
      return {
        ...state,
        insightsHistoryRequestState: RequestState.failure,
      };
    }

    case getType(fetchAlertsDataAsyncAction.request): {
      return {
        ...state,
        alertsHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchAlertsDataAsyncAction.success): {
      return {
        ...state,
        alertsHistory: action.payload,
        alertsHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchAlertsDataAsyncAction.failure): {
      return {
        ...state,
        alertsHistoryRequestState: RequestState.failure,
      };
    }

    default: {
      return state;
    }
  }
};
