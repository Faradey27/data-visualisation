import { getType } from 'typesafe-actions';

import { QueueSizeHistoryEntry, RequestState } from '../../api/types';
import { ChartAction, fetchQueueSizeHistoryAsyncAction } from './actions';

export interface ChartState {
  queueSizeHistory: QueueSizeHistoryEntry[];
  queueSizeHistoryRequestState: RequestState;
}

const initialState: ChartState = {
  queueSizeHistory: [],
  queueSizeHistoryRequestState: RequestState.unset,
};

export const chartReducer = (state = initialState, action: ChartAction) => {
  switch (action.type) {
    case getType(fetchQueueSizeHistoryAsyncAction.request): {
      return {
        ...state,
        queueSizeHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchQueueSizeHistoryAsyncAction.success): {
      return {
        ...state,
        queueSizeHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchQueueSizeHistoryAsyncAction.failure): {
      return {
        ...state,
        queueSizeHistoryRequestState: RequestState.failure,
      };
    }

    default: {
      return state;
    }
  }
};
