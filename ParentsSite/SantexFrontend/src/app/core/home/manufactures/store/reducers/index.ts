import { ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as fromManufactures from './manufactures.reducers';

export interface FeatureState{
    manufactures: fromManufactures.State,
}

export const reducer: ActionReducerMap<FeatureState> = {
    manufactures: fromManufactures.manufacturesReducer,
};

export const getManufactures = (state: FeatureState) => state.manufactures;