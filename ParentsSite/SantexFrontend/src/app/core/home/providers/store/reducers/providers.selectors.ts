import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProviders from './providers.reducers';
import * as fromReducers from './';

export const getReducer =
createFeatureSelector<fromReducers.FeatureState>('providers');

export const getProvidersState = createSelector(getReducer, fromReducers.getProviders)
export const getIds = createSelector(getProvidersState, fromProviders.getIds);
export const getPageInfo = createSelector(getProvidersState, fromProviders.getPageInfo);
export const getProviders = createSelector(getProvidersState, fromProviders.getProviders);
export const getAllProviders = createSelector(getIds, getProviders, (ids, providers) => {
    return ids.map(id => providers[id]);
});