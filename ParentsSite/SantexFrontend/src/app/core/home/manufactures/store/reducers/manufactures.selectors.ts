import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromManufactures from './manufactures.reducers';
import * as fromReducers from './';

export const getReducer = 
createFeatureSelector<fromReducers.FeatureState>('manufactures');

export const getManufacturesState = createSelector(getReducer, fromReducers.getManufactures)
export const getIds = createSelector(getManufacturesState, fromManufactures.getIds);
export const getEditManufacture = createSelector(getManufacturesState, fromManufactures.getEditManufacture);
export const getPageInfo = createSelector(getManufacturesState, fromManufactures.getPageInfo);
export const getManufactures = createSelector(getManufacturesState, fromManufactures.getManufactures);
export const getAllManufactures = createSelector(getIds, getManufactures, (ids, purchases) => {
    return ids.map(id => purchases[id]);
});