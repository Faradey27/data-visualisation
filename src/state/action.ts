import { ThunkAction } from 'redux-thunk';

import { ChartAction } from './chart/actions';
import { RootState } from './reducer';
import { WidgetsAction } from './widgets/actions';

export type RootAction = ChartAction | WidgetsAction;
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
