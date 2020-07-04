import { combineReducers } from 'redux';

import { chartReducer, ChartState } from './chart/reducer';
import { widgetsReducer, WidgetsState } from './widgets/reducer';

export interface RootState {
  chart: ChartState;
  widgets: WidgetsState;
}

export default combineReducers({
  chart: chartReducer,
  widgets: widgetsReducer,
});
