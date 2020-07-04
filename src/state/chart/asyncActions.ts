import api from '../../api';
import { RootThunkAction } from '../action';
import { fetchQueueSizeHistoryAsyncAction } from './actions';

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
