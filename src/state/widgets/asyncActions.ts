import api from '../../api';
import { RootThunkAction } from '../action';
import {
  fetchAlertsDataAsyncAction,
  fetchInsightsDataAsyncAction,
  fetchResourcesDataAsyncAction,
} from './actions';

export const fetchResourcesDataAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchResourcesDataAsyncAction.request());

    try {
      const res = await api.fetchResourcesHistory();
      dispatch(fetchResourcesDataAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchResourcesDataAsyncAction.failure(e));
    }
  };
};

export const fetchAlertsDataAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchAlertsDataAsyncAction.request());

    try {
      const res = await api.fetchAlertsHistory();
      dispatch(fetchAlertsDataAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchAlertsDataAsyncAction.failure(e));
    }
  };
};

export const fetchInsightsDataAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchInsightsDataAsyncAction.request());

    try {
      const res = await api.fetchInsightsHistory();
      dispatch(fetchInsightsDataAsyncAction.success(res.items));
    } catch (e) {
      dispatch(fetchInsightsDataAsyncAction.failure(e));
    }
  };
};
