import { ActionReducerMap } from '@ngrx/store';

import * as fromDrivers     from './drivers.reducers';

export interface FeatureState{
    drivers: fromDrivers.State,
}

export const reducer: ActionReducerMap<FeatureState> = {
    drivers: fromDrivers.driversReducer,
};

export const getDrivers = (state: FeatureState) => state.drivers;