import api from '../../api';
import { RootThunkAction } from '../action';
import {
  fetchDeadLetterQueueHistoryAsyncAction,
  fetchPayloadSizeHistoryAsyncAction,
  fetchQueueSizeHistoryAsyncAction,
  fetchResponseDelayHistoryAsyncAction,
} from './actions';

export const fetchQueueSizeHistoryAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchQueueSizeHistoryAsyncAction.request());

    try {
      const res = await api.fetchQueueSizeHistory();
      dispatch(fetchQueueSizeHistoryAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchQueueSizeHistoryAsyncAction.failure(e));
    }
  };
};

export const fetchResponseDelayHistoryAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchResponseDelayHistoryAsyncAction.request());

    try {
      const res = await api.fetchResponseDelayHistory();
      dispatch(fetchResponseDelayHistoryAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchResponseDelayHistoryAsyncAction.failure(e));
    }
  };
};

export const fetchPayloadSizeHistoryAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchPayloadSizeHistoryAsyncAction.request());

    try {
      const res = await api.fetchPayloadSizeHistory();
      dispatch(fetchPayloadSizeHistoryAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchPayloadSizeHistoryAsyncAction.failure(e));
    }
  };
};

export const fetchDeadLetterQueueHistoryAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchDeadLetterQueueHistoryAsyncAction.request());

    try {
      const res = await api.fetchDeadLetterQueueHistory();
      dispatch(fetchDeadLetterQueueHistoryAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchDeadLetterQueueHistoryAsyncAction.failure(e));
    }
  };
};
