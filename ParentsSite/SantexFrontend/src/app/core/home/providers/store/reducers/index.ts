import { ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as fromProviders from './providers.reducers';

export interface FeatureState{
    providers: fromProviders.State,
}

export const reducer: ActionReducerMap<FeatureState> = {
    providers: fromProviders.providersReducer,
};

export const getProviders = (state: FeatureState) => state.providers;