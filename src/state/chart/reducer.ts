import { getType } from 'typesafe-actions';

import {
  DeadLetterQueueHistoryEntry,
  PayloadSizeHistoryEntry,
  QueueSizeHistoryEntry,
  RequestState,
  ResponseDelayHistoryEntry,
} from '../../api/types';
import {
  ChartAction,
  fetchDeadLetterQueueHistoryAsyncAction,
  fetchPayloadSizeHistoryAsyncAction,
  fetchQueueSizeHistoryAsyncAction,
  fetchResponseDelayHistoryAsyncAction,
} from './actions';

export interface ChartState {
  queueSizeHistory: QueueSizeHistoryEntry[];
  queueSizeHistoryRequestState: RequestState;
  responseDelayHistory: ResponseDelayHistoryEntry[];
  responseDelayHistoryRequestState: RequestState;
  payloadSizeHistory: PayloadSizeHistoryEntry[];
  payloadSizeHistoryRequestState: RequestState;
  deadLetterQueueHistory: DeadLetterQueueHistoryEntry[];
  deadLetterQueueHistoryRequestState: RequestState;
}

const initialState: ChartState = {
  queueSizeHistory: [],
  queueSizeHistoryRequestState: RequestState.unset,
  responseDelayHistory: [],
  responseDelayHistoryRequestState: RequestState.unset,
  payloadSizeHistory: [],
  payloadSizeHistoryRequestState: RequestState.unset,
  deadLetterQueueHistory: [],
  deadLetterQueueHistoryRequestState: RequestState.unset,
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
        queueSizeHistory: action.payload,
        queueSizeHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchQueueSizeHistoryAsyncAction.failure): {
      return {
        ...state,
        queueSizeHistoryRequestState: RequestState.failure,
      };
    }

    case getType(fetchResponseDelayHistoryAsyncAction.request): {
      return {
        ...state,
        responseDelayHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchResponseDelayHistoryAsyncAction.success): {
      return {
        ...state,
        responseDelayHistory: action.payload,
        responseDelayHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchResponseDelayHistoryAsyncAction.failure): {
      return {
        ...state,
        responseDelayHistoryRequestState: RequestState.failure,
      };
    }

    case getType(fetchPayloadSizeHistoryAsyncAction.request): {
      return {
        ...state,
        payloadSizeHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchPayloadSizeHistoryAsyncAction.success): {
      return {
        ...state,
        payloadSizeHistory: action.payload,
        payloadSizeHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchPayloadSizeHistoryAsyncAction.failure): {
      return {
        ...state,
        payloadSizeHistoryRequestState: RequestState.failure,
      };
    }

    case getType(fetchDeadLetterQueueHistoryAsyncAction.request): {
      return {
        ...state,
        deadLetterQueueHistoryRequestState: RequestState.waiting,
      };
    }
    case getType(fetchDeadLetterQueueHistoryAsyncAction.success): {
      return {
        ...state,
        deadLetterQueueHistory: action.payload,
        deadLetterQueueHistoryRequestState: RequestState.success,
      };
    }
    case getType(fetchDeadLetterQueueHistoryAsyncAction.failure): {
      return {
        ...state,
        deadLetterQueueHistoryRequestState: RequestState.failure,
      };
    }

    default: {
      return state;
    }
  }
};
